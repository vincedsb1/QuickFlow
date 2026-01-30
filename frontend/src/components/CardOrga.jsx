import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrgaContext from "../contexts/OrgaContext";
import trash from "../assets/logos/trash.svg";
import trashOpen from "../assets/logos/trash_open.svg";
import RoleContext from "../contexts/RoleContext";
import UserContext from "../contexts/UserContext";

function CardOrga({ name, logo, id, setPopUp, setorgaId }) {
  const { orgaContext, setOrgaContext } = useContext(OrgaContext);
  const { setRoleContext } = useContext(RoleContext);
  const { user } = useContext(UserContext);
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (el) => {
    await setOrgaContext(el.target.value);
    localStorage.setItem("orgaContext", JSON.stringify(el.target.value));
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    await axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${
          user.id
        }/orga/${orgaContext}/role`,
        {
          headers,
        }
      )
      .then(async (res) => {
        await setRoleContext(res.data);
        await navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="border border-solid w-auto border-slate-300 flex items-center flex-col p-5 m-5 rounded-lg ">
        <div className=" h-10 w-full flex justify-end">
          <button
            type="button"
            onClick={() => {
              setPopUp(true);
              setorgaId(id);
            }}
          >
            <img
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              src={hover ? trashOpen : trash}
              alt="trash"
              className=" h-full opacity-50 hover:opacity-100 hover:cursor-pointer transition-all "
            />
          </button>
        </div>
        <div className="border border-solid border-slate-300 rounded-full h-[152px] w-[152px] bg-white ">
          <img
            src={
            logo.startsWith("http")
              ? logo
              : `${import.meta.env.VITE_BACKEND_URL}${logo}`
          }
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <p className="font-texts text-slate-900 text-[22px] p-6">{name}</p>
        <button
          onClick={handleSubmit}
          value={id}
          type="button"
          className=" text-[22px] w-[200px] h-[43px] mb-5 font-texts text-white bg-gradient-to-r rounded-full from-emerald-600 to-emerald-400 active md:w-[254px]"
        >
          Rejoindre
        </button>
      </div>
      <br />
    </>
  );
}

CardOrga.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setorgaId: PropTypes.func.isRequired,
  setPopUp: PropTypes.func.isRequired,
};

export default CardOrga;
