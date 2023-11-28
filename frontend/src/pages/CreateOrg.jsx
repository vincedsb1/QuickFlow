import { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import NavbarOrga from "../components/Navbarorga";

function CreateOrg() {
  const [titleOrg, setTitleOrg] = useState("");
  const [descriptionOrg, setDescriptionOrg] = useState("");
  const [logo, setLogo] = useState(null);
  const { user } = useContext(UserContext);
  const form = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append("logo", inputRef.current.files[0]);
    const file = event.target.files[0];
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/orga/upload`,
      formData,
      { headers }
    );
    setLogo(
      `${import.meta.env.VITE_BACKEND_URL}/photo/organisation/${file.name}`
    );
  };

  const handleCreateOrg = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}/orga`,
        { titleOrg, descriptionOrg, logo },
        { headers }
      )
      .then((response) => {
        const newOrgaId = response.data.id;
        return Promise.all([
          axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/user/${
              user.id
            }/orga/${newOrgaId}/role/1/checkRole`,
            { checkRole: 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/${
              user.id
            }/orga/${newOrgaId}/role/2/checkRole`,
            { checkRole: 0 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/${
              user.id
            }/orga/${newOrgaId}/role/3/checkRole`,
            { checkRole: 0 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/${
              user.id
            }/orga/${newOrgaId}/role/4/checkRole`,
            { checkRole: 0 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
        ]);
      })
      .then(() => {
        setTimeout(() => navigate("/choose_organisation"), 250);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div id="page-create-org" className="App bg-slate-100 h-screen">
      <div id="header-box" className="pb-8">
        <NavbarOrga />
      </div>
      <div className="px-5">
        <div
          id="body-create-org"
          className="bg-white shadow-md rounded-md p-3 pb-6 mb-6 border-solid border border-slate-300 max-w-5xl m-auto"
        >
          <div id="logo-box" className="flex justify-between gap-5">
            <h1 className="font-titles text-3xl font-bold p-6">
              Créez votre organisation
            </h1>
            <div className="flex flex-col-reverse items-end gap-5 pr-6">
              <label
                htmlFor="logo"
                className="font-bold cursor-pointer font-texts text-sky-600 text-lg"
              >
                Ajoutez un logo d'organisation
              </label>
              <input
                id="logo"
                className="w-full hidden"
                type="file"
                onChange={handleFileChange}
                name="logo"
                ref={inputRef}
              />
              <div className="rounded-full h-[120px] w-[120px] mr-16">
                <img
                  src={logo && logo}
                  className="w-full h-full border border-solid border-slate-300 rounded-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>

          <form
            ref={form}
            encType="multipart/form-data"
            onSubmit={handleCreateOrg}
            className="px-6"
          >
            <label htmlFor="titre">
              Titre <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              id="titre"
              type="text"
              name="titre"
              required
              className="input-quickflow"
              placeholder="Le nom de votre organisation"
              value={titleOrg}
              onChange={(e) => setTitleOrg(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id="description"
              className="border-solid border border-slate-300 p-1 rounded-sm w-full outline-2 outline-slate-400"
              cols="20"
              rows="5"
              placeholder="Vous pouvez spécifier ici des détails sur l'organisation, le lieu ou autre."
              value={descriptionOrg}
              onChange={(e) => setDescriptionOrg(e.target.value)}
            />
            <br />
            <br />
            <div
              id="button-box"
              className="flex flex-col justify-center items-center gap-3"
            >
              <button
                type="submit"
                value="Créer une organisation"
                className="w-64 p-2 ml-1/2 font-texts text-white bg-gradient-to-r rounded-full from-emerald-600 to-emerald-400 active"
              >
                Créer
              </button>
              <NavLink to="/choose_organisation">
                <p className=" text-emerald-600 font-texts font-bold">Retour</p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrg;
