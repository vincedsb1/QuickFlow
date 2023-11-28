import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import OrgaContext from "../contexts/OrgaContext";
import RoleContext from "../contexts/RoleContext";

function PopupEditIdee({ ideaId, refreshIdeas }) {
  const { user } = useContext(UserContext);
  const { orgaContext } = useContext(OrgaContext);
  const { roleContext } = useContext(RoleContext);

  const [isCreatorIdea, setIsCreatorIdea] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  // le useEffect permet de déterminer s
  useEffect(() => {
    // je recupère l'id de l'utilisateur actuellement connecté
    const currentUser = user.id;

    // je récupere l'id de l'utilisateur qui a créé l'idée
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/idee/${ideaId}/details`
        );
        const whichUserCreateIdea = response.data[0].user_id;

        // je teste les conditions pour déterminer les droits de l'utilsateur actuel
        setIsCreatorIdea(currentUser === whichUserCreateIdea);
        setIsAdmin(roleContext[0].check_role === 1);
        setIsModerator(roleContext[2].check_role === 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [roleContext, user.id, orgaContext]);

  const handleClickDeleteIdea = async () => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5026/user/${user.id}/orga/${orgaContext}/dashboard/delete/${ideaId}`;

    await axios

      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        refreshIdeas();
      })
      .catch((err) => {
        console.error("erreur suppression : ", err);
      });
  };

  let canIEditAndDestroyID;

  switch (true) {
    case isCreatorIdea || isAdmin:
      canIEditAndDestroyID = (
        <>
          <NavLink to={`/editidea/${ideaId}`}>
            <div className="flex items-center gap-3 mb-1  hover:text-blue-500 duration-300">
              <FiEdit2 />
              <p className="font-title hover:cursor-pointer text-base font-bold">
                Modifier
              </p>
            </div>
          </NavLink>
          <div id="separator" className="w-full h-[1px] bg-slate-200 my-3" />
          <button
            type="button"
            onClick={handleClickDeleteIdea}
            className="flex items-center gap-3 mb-1 hover:text-red-500 duration-300"
          >
            <FiTrash2 />
            <p className="font-title hover:cursor-pointer text-base font-bold">
              Supprimer
            </p>
          </button>
        </>
      );
      break;
    case isModerator:
      canIEditAndDestroyID = (
        <>
          <div
            title="Vous n'avez pas les droits pour éditer cette idée"
            className="flex items-center gap-3 mb-1 duration-300 text-gray-300 cursor-not-allowed"
          >
            <FiEdit2 />
            <p className="font-title text-base font-bold">Modifier</p>
          </div>
          <div id="separator" className="w-full h-[1px] bg-slate-200 my-3" />
          <button
            type="button"
            onClick={handleClickDeleteIdea}
            className="flex items-center gap-3 mb-1 hover:text-red-500 duration-300"
          >
            <FiTrash2 />
            <p className="font-title hover:cursor-pointer text-base font-bold">
              Supprimer
            </p>
          </button>
        </>
      );
      break;
    default:
      canIEditAndDestroyID = (
        <>
          <div
            title="Vous n'avez pas les droits pour éditer cette idée"
            className="flex items-center gap-3 mb-1 duration-300 text-gray-300 cursor-not-allowed"
          >
            <FiEdit2 />
            <p className="font-title text-base font-bold">Modifier</p>
          </div>
          <div id="separator" className="w-full h-[1px] bg-slate-200 my-3" />
          <button
            type="button"
            title="Vous n'avez pas les droits pour supprimer cette idée"
            className="flex items-center gap-3 mb-1 cursor-not-allowed text-gray-300 duration-300"
          >
            <FiTrash2 />
            <p className="font-title text-base font-bold">Supprimer</p>
          </button>
        </>
      );
  }

  return (
    <div className="absolute -top-4 left-[68px] w-fit h-fit rounded-md py-5 px-7 text-base drop-shadow-lg border font-bold text-slate-900 bg-white ">
      {canIEditAndDestroyID}
    </div>
  );
}

PopupEditIdee.propTypes = {
  ideaId: PropTypes.number.isRequired,
  refreshIdeas: PropTypes.number.isRequired,
};

export default PopupEditIdee;
