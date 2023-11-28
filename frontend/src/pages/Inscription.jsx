import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import logoQuickFlow from "../assets/logos/logo-quickflow.svg";

function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [check, setCheck] = useState(true);
  const [dataEmail, setDataEmail] = useState([]);
  const [error, setError] = useState(true);

  // Récupération de orgId dans l'url
  const url = new URL(window.location.href);
  const orgId = url.searchParams.get("orgId");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user`)
      .then((res) => {
        setDataEmail(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleCheck = () => {
    setCheck(!check);
  };

  const navigate = useNavigate();

  const handleSubmit = (inscription) => {
    inscription.preventDefault();

    // Assurez-vous que dataEmail est un tableau avant d'utiliser 'find'
    if (!Array.isArray(dataEmail)) {
      console.error("dataEmail n'est pas un tableau");
      return;
    }

    const userExists = dataEmail.find(
      (data) => data.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setError(false);
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { nom, prenom, email, motDePasse },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const newUserId = response.data.id;
        if (orgId) {
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/inviteUser`, {
              orgId,
            })
            .then(() => {
              return Promise.all([
                axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/user/${newUserId}/orga/${orgId}/role/2/checkRole/inscription`,
                  { checkRole: 0 }
                ),
                axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/user/${newUserId}/orga/${orgId}/role/3/checkRole/inscription`,
                  { checkRole: 0 }
                ),
                axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/user/${newUserId}/orga/${orgId}/role/4/checkRole/inscription`,
                  { checkRole: 0 }
                ),
              ]);
            })
            .catch((err) => console.error(err));
        }
        setTimeout(() => {
          navigate("/login");
        }, 250);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id="body" className="App h-fit min-h-screen bg-slate-100 pt-5">
      <div id="logo" className="flex justify-center pb-9">
        <img
          id="logo"
          src={logoQuickFlow}
          alt="Logo Quickflow"
          className="py-5 w-32"
        />
      </div>
      <div
        id="box_global"
        className=" bg-white flex-col p-10 shadow border-solid border border-slate-300 leading-8 py-12 max-w-3xl m-auto rounded-lg"
      >
        <div id="titre">
          <h1 className="font-titles text-slate-900 font-bold text-3xl">
            Créez un compte...
          </h1>
        </div>

        <div id="text">
          <p className="font-texts text-slate-900 text-[22px] pt-9 ">
            Et commencez à utiliser Quickflow tout de suite.
          </p>
        </div>
        <br />
        <form action="" onSubmit={handleSubmit}>
          <div id="div name">
            <label
              htmlFor="name"
              className="block font-texts text-lg  text-slate-700 pb-1"
            >
              Votre nom <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              id="name"
              placeholder="Exemple : DUPOND"
              name="name"
              type="name"
              onChange={(event) => setNom(event.target.value)}
              autoComplete="name"
              required
              className="input-quickflow "
            />
          </div>
          <div id="div username">
            <label
              htmlFor="prenom"
              className="block font-texts text-lg bg-white text-slate-700 pb-1 pt-6"
            >
              Votre prénom <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              id="prenom"
              placeholder="Exemple : Jean-Pierre"
              onChange={(event) => setPrenom(event.target.value)}
              name="prenom"
              type="prenom"
              required
              className="input-quickflow  "
            />
          </div>
          <div id="div email">
            <label
              htmlFor="email"
              className={`block font-texts text-lg  pb-1 pt-6 ${
                error ? "text-slate-700" : "text-red-700"
              }`}
            >
              Votre email <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              id="email"
              onChange={(event) => setEmail(event.target.value.toLowerCase())}
              placeholder="Exemple : jp.dupond@gmail.com"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`  ${
                error ? "input-quickflow" : "inputError-quickflow"
              }`}
            />
          </div>
          <div className={error ? "hidden" : "visible flex flex-row"}>
            <p className="text-red-700">
              Ce compte existe déjà :{" "}
              <NavLink to="/login">
                <span className="text-emerald-600 font-texts font-bold underline">
                  Connectez-vous
                </span>
              </NavLink>
            </p>
          </div>
          <div id="div password">
            <label
              htmlFor="password"
              className="block font-texts text-lg  text-slate-700 pb-1 pt-6"
            >
              Votre mot de passe <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              id="password"
              onChange={(event) => setMotDePasse(event.target.value)}
              placeholder="Saisissez 8 caractères minimum s'il vous plaît"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input-quickflow"
            />
          </div>
          <br />
          <div id="checkbox" className="flex items-center">
            <input
              type="checkbox"
              onChange={handleCheck}
              className="border border-solid border-slate-300 w-[40px] h-[30px]"
            />
            <p className="font-texts font-base pl-2">
              J'accepte les Conditions générales et la Politique de
              confidentialité
            </p>
          </div>
          <br />
          <div id="bouton" className="flex justify-center py-4">
            <button
              type="submit"
              value="Créer un compte"
              className={`w-full h-[43px] font-titles font-bold font-lg text-white rounded-full ${
                check
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-400"
              } ${check ? "opacity-50 cursor-not-allowed" : "active"}`}
            >
              Créer un compte
            </button>
          </div>
          <div className="flex justify-center pt-4">
            <NavLink to="/">
              <button
                type="button"
                className="text-emerald-600 font-texts font-bold pl-3"
              >
                Retour
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
//
export default Inscription;
