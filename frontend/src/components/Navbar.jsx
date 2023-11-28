import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function Navbar({ setEndpoint, currentEndpoint }) {
  return (
    <div
      id="dashboard-bar"
      className="h-16 flex items-center justify-center border-solid border-b border-slate-300 px-4 max-w-8xl bg-white"
    >
      <div
        id="headerMenuContainer"
        className="flex flex-row items-center w-full lg:w-[1280px] h-full"
      >
        <div id="menu" className="flex space-x-4 ml-10 h-full items-center">
          <div
            id="DivAVoter"
            className={`border-solid h-full justify-center items-center ${
              currentEndpoint === "vote" ? "border-b-4 border-emerald-500" : ""
            }`}
          >
            <button
              id="MenuAVoter"
              className="hover:text-emerald-500 focus:text-emerald-500 h-full"
              type="button"
              onClick={() => setEndpoint("vote")}
            >
              À voter
            </button>
          </div>
          <div
            id="DivDescision"
            className={`border-solid h-full justify-center items-center ${
              currentEndpoint === "decision"
                ? "border-b-4 border-emerald-500"
                : ""
            }`}
          >
            <button
              id="MenuDescisions"
              className="hover:text-emerald-500 focus:text-emerald-500 h-full"
              type="button"
              onClick={() => setEndpoint("decision")}
            >
              Décisions en cours
            </button>
          </div>
          <div
            id="DivTermine"
            className={`border-solid h-full justify-center items-center ${
              currentEndpoint === "termine"
                ? "border-b-4 border-emerald-500"
                : ""
            }`}
          >
            <button
              id="MenuTermine"
              className="hover:text-emerald-500 focus:text-emerald-500 h-full"
              type="button"
              onClick={() => setEndpoint("termine")}
            >
              Terminées
            </button>
          </div>
        </div>
        <div
          id="addIdeaContainer"
          className="ml-auto mr-10 sm:border-solid sm:border-2 border-emerald-500 rounded-full px-4 py-2 relative"
          type="button"
        >
          <NavLink to="/newidea">
            <button
              id="addIdeaButton"
              className="hidden sm:flex items-center text-emerald-500 px-2"
              type="button"
            >
              Proposer une idée
            </button>

            <button
              className="sm:hidden fixed bottom-10 right-10 bg-emerald-500 text-slate-50 text-4xl font-bold rounded-full w-16 h-16 flex items-center justify-center"
              type="button"
            >
              +
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  setEndpoint: PropTypes.func.isRequired,
  currentEndpoint: PropTypes.string.isRequired,
};

export default Navbar;
