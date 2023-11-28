import { React, useEffect, useState, useContext } from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import PropTypes from "prop-types";
import axios from "axios";
import OrgaContext from "../../contexts/OrgaContext";
import UserContext from "../../contexts/UserContext";

function Vote({
  vote,
  votant,
  ideaId,
  onVoteChange,
  onVotantChange,
  endpoint,
  currentPage,
}) {
  const [ideaStatus, setIdeaStatus] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const { orgaContext } = useContext(OrgaContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${
          user.id
        }/idee/${ideaId}/status`
      )
      .then((response) => {
        if (response.data[0]) {
          setIdeaStatus(response.data[0].status);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [ideaId]);

  const updateVoteStatus = (updatedVote, updatedVotant, updatedStatus) => {
    const ideaData = {
      vote: updatedVote,
      votant: updatedVotant,
      status: updatedStatus,
    };
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/${
          user.id
        }/orga/${orgaContext}/vote/update/${ideaId}`,
        ideaData,
        { headers }
      )
      .then(() => {
        onVoteChange(updatedVote);
        onVotantChange(updatedVotant);
        setIdeaStatus(updatedStatus);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    if (ideaStatus === 1 || ideaStatus === 2) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000); // Arrête l'animation après 1 seconde
    }
  }, [ideaStatus]);

  const handleVote = (increment) => {
    if (increment > 0) {
      if (ideaStatus !== 1) {
        // if the user has not voted up before, count his vote
        // Status 1 = vote up, 2 = vote down, 0 = no vote
        const updatedVote = ideaStatus === 2 ? vote + 2 : vote + 1;
        const updatedVotant = ideaStatus === 0 ? votant + 1 : votant;
        const updatedStatus = 1;

        // On met à jour le status, le vote et le nombre de votants
        updateVoteStatus(updatedVote, updatedVotant, updatedStatus);
      } else {
        // if the user has already voted up, remove his vote
        const updatedVote = vote - 1;
        const updatedVotant = votant - 1;
        const updatedStatus = 0;

        // On met à jour le status, le vote et le nombre de votants
        updateVoteStatus(updatedVote, updatedVotant, updatedStatus);
      }
    } else if (increment < 0) {
      if (ideaStatus !== 2) {
        // if the user has not voted down before, count his vote
        const updatedVote = ideaStatus === 1 ? vote - 2 : vote - 1;
        const updatedVotant = ideaStatus === 0 ? votant + 1 : votant;
        const updatedStatus = 2;

        // On met à jour le status, le vote et le nombre de votants
        updateVoteStatus(updatedVote, updatedVotant, updatedStatus);
      } else {
        // if the user has already voted down, remove his vote
        const updatedVote = vote + 1;
        const updatedVotant = votant - 1;
        const updatedStatus = 0;

        // On met à jour le status, le vote et le nombre de votants
        updateVoteStatus(updatedVote, updatedVotant, updatedStatus);
      }
    }
  };

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
    <div id="voteVotersContainer" className="flex flex-col">
      {loading ? (
        (() => {
          if (endpoint === "vote" || currentPage.startsWith("/details/")) {
            return (
              <div className="flex flex-col justify-center items-center">
                <div className="w-40 h-12 rounded-full bg-slate-300 animate-pulse" />
                <div className="w-14 h-4 rounded-full bg-slate-300 animate-pulse mt-2" />
              </div>
            );
          }
          return (
            <div className="flex flex-col justify-center items-center">
              <div className="w-14 h-12 rounded-full bg-slate-300 animate-pulse" />
              <div className="w-14 h-4 rounded-full bg-slate-300 animate-pulse mt-2" />
            </div>
          );
        })()
      ) : (
        <>
          <div
            id="voteContainer"
            className="flex flex-row border-solid border-2 border-slate-300 rounded-full px-4 py-2"
          >
            {ideaStatus !== null && (
              <>
                {endpoint === "vote" || currentPage.startsWith("/details/") ? (
                  <div
                    id="downVote"
                    className="px-3 pt-1 flex items-center hover:scale-125 transition-all active:scale-150"
                    onClick={() => handleVote(-1)}
                    onKeyPress={() => handleVote(-1)}
                    role="button"
                    tabIndex={0}
                  >
                    {ideaStatus === 1 || ideaStatus === 0 ? (
                      <BsHandThumbsDown className="text-slate-400 text-2xl" />
                    ) : (
                      <BsHandThumbsDownFill className="text-slate-400 text-2xl" />
                    )}
                  </div>
                ) : null}
                <div
                  id="voteScore"
                  className={`text-2xl font-texts font-bold transition-all transform ${getVoteColor()} ${
                    animate ? "scale-up-animation" : ""
                  }`}
                >
                  {vote}
                </div>
                {endpoint === "vote" || currentPage.startsWith("/details/") ? (
                  <div
                    id="upVote"
                    className="px-3 flex items-center hover:scale-125 transition-all active:scale-150"
                    onClick={() => handleVote(1)}
                    onKeyPress={() => handleVote(1)}
                    role="button"
                    tabIndex={0}
                  >
                    {ideaStatus === 2 || ideaStatus === 0 ? (
                      <BsHandThumbsUp className="text-emerald-500 text-2xl" />
                    ) : (
                      <BsHandThumbsUpFill className="text-emerald-500 text-2xl" />
                    )}
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div
            id="voters"
            className="font-texts text-slate-300 text-sm flex justify-center items-center"
          >
            {votant} votants
          </div>
        </>
      )}
    </div>
  );
}

Vote.propTypes = {
  vote: PropTypes.number.isRequired,
  votant: PropTypes.number.isRequired,
  ideaId: PropTypes.number.isRequired,
  onVoteChange: PropTypes.func.isRequired,
  onVotantChange: PropTypes.func.isRequired,
  endpoint: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
};

Vote.defaultProps = {
  endpoint: "vote",
};

export default Vote;
