import { React, useContext } from "react";
import axios from "axios";
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import PropTypes from "prop-types";
import OrgaContext from "../contexts/OrgaContext";
import RoleContext from "../contexts/RoleContext";

function Decision({ ideaId, refreshIdeas }) {
  const { orgaContext } = useContext(OrgaContext);
  const { roleContext } = useContext(RoleContext);

  const updateStatus = (finalStatusLabel, statusId) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put(
        `http://localhost:5026/orga/${orgaContext}/update/${ideaId}`,
        {
          finalStatusLabel,
          statusId,
        },
        { headers }
      )
      .then(function onResponse(response) {
        console.info(response);
        refreshIdeas();
      })
      .catch(function onError(error) {
        console.info(error);
      });
  };

  return roleContext[1].check_role === 1 ? (
    <div
      id="decisionGlobalContainer"
      className="flex flex-col items-center justify-center mb-7"
    >
      <div id="decisionContainer" className="flex flex-row px-4 py-2">
        <div
          id="DeniedButton"
          className="flex items-center justify-center hover:scale-105 transition-all active:scale-110 border-solid border-2 border-red-400 rounded px-4 py-2 w-40 mr-3"
          role="button"
          tabIndex={0}
          onClick={() => {
            updateStatus("Refusé", 3);
          }}
          onKeyDown={() => {
            updateStatus("Refusé", 3);
          }}
        >
          <p className="font-texts font-bold text-red-400">Refuser</p>
          <BsHandThumbsDownFill className="text-red-400 text-2xl ml-2" />
        </div>
        <div
          id="AgreedButton"
          className="flex items-center justify-center hover:scale-105 transition-all active:scale-110 border-solid border-2 border-emerald-500 rounded px-4 py-2 w-40 ml-3"
          role="button"
          tabIndex={0}
          onClick={() => {
            updateStatus("Validé", 3);
          }}
          onKeyDown={() => {
            updateStatus("Validé", 3);
          }}
        >
          <BsHandThumbsUpFill className="text-emerald-500 text-2xl mr-2" />
          <p className="font-texts font-bold text-emerald-500">Approuver</p>
        </div>
      </div>
    </div>
  ) : null;
}

Decision.propTypes = {
  ideaId: PropTypes.number.isRequired,
  refreshIdeas: PropTypes.func,
};

Decision.defaultProps = {
  refreshIdeas: () => {},
};

export default Decision;
