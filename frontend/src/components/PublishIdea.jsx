import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function PublishIdea({ onSubmit }) {
  return (
    <div id="publish-idea-container" className="flex items-center gap-5">
      <NavLink to="/dashboard">
        <p
          id="publish-idea-cancel-creation"
          className="text-base font-semibold text-slate-900 "
        >
          Fermer
        </p>
      </NavLink>
      <button
        type="button"
        id="publish-idea-button"
        onClick={onSubmit}
        className="bg-emerald-500 px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100 "
      >
        Publier
      </button>
    </div>
  );
}

PublishIdea.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PublishIdea;
