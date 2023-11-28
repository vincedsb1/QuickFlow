import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

function PopUpDeleteOrga({ setPopUp, orgaId, user, onOrgaDeleted }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    return axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}/orga/${orgaId}`,
        {
          headers,
        }
      )
      .then((reponse) => {
        console.info("Suppresion de l'orga");
        console.info(reponse);
        setPopUp(false);
        onOrgaDeleted(orgaId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex absolute z-50 h-full w-full bg-slate-300 bg-opacity-80 ">
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-200 border border-solid w-auto bg-white border-slate-300 p-5 m-5 rounded-lg  ">
        <p className=" font-texts text-[22px] opac">
          voulez-vous supprimer cette organisation de votre liste
        </p>
        <br />
        <button
          type="button"
          onClick={handleDelete}
          className=" mr-10 text-[22px] w-[200px] h-[43px] mb-5 font-texts text-white bg-gradient-to-r rounded-full from-emerald-600 to-emerald-400 active md:w-[254px]"
        >
          oui
        </button>
        <button
          type="button"
          onClick={() => setPopUp(false)}
          className=" w-[200px] h-[43px] font-texts text-[22px] rounded-full text-emerald-500 border-solid border-2 border-emerald-500 md:w-[254px]"
        >
          non
        </button>
      </div>
    </div>
  );
}

PopUpDeleteOrga.propTypes = {
  setPopUp: PropTypes.func.isRequired,
  orgaId: PropTypes.number.isRequired,
  onOrgaDeleted: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default PopUpDeleteOrga;
