import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { BiComment } from "react-icons/bi";
import axios from "axios";

function SmallIdea({ ideaId, titre, vote }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/idee/${ideaId}/comment`)
      .then((response) => {
        const ideaData = response.data;
        setData(ideaData);
      });
  }, [ideaId]);

  const getVoteColor = () => {
    if (vote < 0) {
      return "text-red-500";
    }
    if (vote === 0) {
      return "text-slate-400";
    }
    return "text-emerald-500";
  };

  return (
    <NavLink to={`/details/${ideaId}`}>
      <div
        id="smallIdeaContainer"
        className="flex flex-row py-4 rounded-lg hover:bg-slate-50"
      >
        <div
          id="smallIdeaTitleComContainer"
          className="flex flex-col w-4/5  pl-4"
        >
          <div
            id="ideaTitle"
            className="text-md font-titles font-bold pr-3 text-slate-900"
          >
            <p className="truncate-1-line">{titre}</p>
          </div>

          <div id="smallIdeaComContainer" className="flex flex-row">
            <div className="pt-1">
              <BiComment className="text-slate-400" />
            </div>

            <div id="ideaComment" className="ml-2 text-slate-400">
              {data.length} commentaires
            </div>
          </div>
        </div>

        <div
          id="smallIdeaVoteContainer"
          className="flex items-center justify-between w-1/5 "
        >
          <div
            id="smallIdeaVoteContainer"
            className={`flex flex-row items-center justify-center border-solid border-2 border-slate-300 rounded-full px-4 py-2 w-16 h-10 font-texts font-bold ${getVoteColor()}`}
          >
            {vote}
          </div>
        </div>
      </div>
    </NavLink>
  );
}

SmallIdea.propTypes = {
  ideaId: PropTypes.number.isRequired,
  titre: PropTypes.string.isRequired,
  vote: PropTypes.number.isRequired,
};

export default SmallIdea;
