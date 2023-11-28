import React, { useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import PropTypes from "prop-types";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { differenceInDays, format } from "date-fns";
import Vote from "./Vote";
import Decision from "../Decision";
import PopupEditIdee from "../PopupEditIdee";
import FinalStatus from "../FinalStatus";

function Idea({
  ideaId,
  titre,
  status,
  contenu,
  vote,
  votant,
  endpoint,
  refreshIdeas,
  deadline: ideaDeadline,
}) {
  const [data, setData] = useState([]);
  const [voteState, setVoteState] = useState(vote);
  const [displayPopupEdit, setDisplayPopupEdit] = useState(false);

  const handleVoteChange = (newVoteValue) => {
    setVoteState(newVoteValue);
  };
  const [votantState, setVotantState] = useState(votant);
  const handleVotantChange = (newVotantValue) => {
    setVotantState(newVotantValue);
  };
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/idee/${ideaId}/comment`)
      .then((response) => {
        const ideaData = response.data;
        setData(ideaData);
      });
  }, [ideaId, ideaDeadline]);

  useEffect(() => {
    setVoteState(vote);
  }, [vote]);

  const handleClickDisplayPopup = () => {
    setDisplayPopupEdit((currentBolean) => !currentBolean);
  };

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysRemaining = differenceInDays(deadlineDate, today);

    if (daysRemaining < 0) {
      const formattedDeadline = format(deadlineDate, "dd/MM/yyyy");
      return `Votes terminés depuis le ${formattedDeadline}`;
    }
    return (
      <>
        {daysRemaining} j<p className="hidden sm:inline-block">ours restants</p>
      </>
    );
  };

  const daysRemaining = calculateDaysRemaining(ideaDeadline);

  return (
    <div
      id="ideaCard"
      className="max-w-7xl bg-white mt-4 ml-7 mr-2 rounded-2xl shadow w-full md:w-[714px] flex-col"
    >
      <div
        id="titleVote"
        className="flex flex-row justify-between items-center p-4"
      >
        <NavLink to={`/details/${ideaId}`}>
          <div
            id="ideaTitle"
            className="text-xl font-titles font-bold pr-3 text-slate-900"
          >
            <p className="truncate-2-lines">{titre}</p>
          </div>
        </NavLink>
        <div id="ideaVote" className="">
          <Vote
            ideaId={ideaId}
            titre={titre}
            vote={voteState}
            votant={votantState}
            onVoteChange={handleVoteChange}
            onVotantChange={handleVotantChange}
            endpoint={endpoint}
            currentPage={location.pathname}
          />
        </div>
      </div>

      <div id="contentIdea" className="font-texts text-slate-500 p-4 pb-10 ">
        <NavLink to={`/details/${ideaId}`}>
          <p className="truncate-4-lines">{contenu}</p>
        </NavLink>
      </div>
      {endpoint === "decision" && (
        <Decision ideaId={ideaId} refreshIdeas={refreshIdeas} />
      )}
      {endpoint === "termine" && <FinalStatus status={status} />}
      <div
        id="footer"
        className="border-slate-200 border-solid border-t-2 p-3 flex flex-row justify-between"
      >
        <div
          id="ideaFooterLeftContainer"
          className="flex flex-row justify-between"
        >
          <div
            id="ideaCommentContainer"
            className="px-4 text-slate-500 font-texts flex flex-row text-center items-center"
          >
            <BiComment className="" />
            <div id="ideaComment" className="ml-2">
              {data.length}{" "}
              <p className="hidden sm:inline-block">commentaires</p>
            </div>
          </div>
          <div
            id="ideaDaysLeftContainer"
            className="px-4 text-slate-500 font-texts flex flex-row text-center items-center"
          >
            <AiOutlineClockCircle className="" />
            <div id="daysLeft" className="ml-2">
              {daysRemaining}
            </div>
          </div>
        </div>
        <div
          id="ideaFooterRightContainer"
          className="px-4 pt-1 text-slate-500 font-texts"
        >
          <div className="relative">
            <button
              className="cursor-pointer"
              onClick={handleClickDisplayPopup}
              type="button"
            >
              <FiMoreHorizontal className="text-2xl" />
            </button>
            {displayPopupEdit ? (
              <PopupEditIdee ideaId={ideaId} refreshIdeas={refreshIdeas} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

Idea.propTypes = {
  ideaId: PropTypes.number.isRequired,
  titre: PropTypes.string.isRequired,
  status: PropTypes.string,
  contenu: PropTypes.string.isRequired,
  vote: PropTypes.number.isRequired,
  votant: PropTypes.number.isRequired,
  endpoint: PropTypes.string.isRequired,
  refreshIdeas: PropTypes.func,
  deadline: PropTypes.string.isRequired,
};

Idea.defaultProps = {
  status: "",
  refreshIdeas: () => {},
};

export default Idea;
//
