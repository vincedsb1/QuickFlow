import React from "react";
import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";

function SaveButton({ onSave }) {
  return (
    <div className="flex items-center justify-center">
      <button
        id="saveButton"
        className="text-white mb-4 md:my-0  text-base md:mr-10 border-solid border-2 border-emerald-500  bg-emerald-500 rounded-full px-4 py-2 w-56"
        type="button"
        onClick={onSave}
      >
        Sauvegarder
      </button>
    </div>
  );
}

SaveButton.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SaveButton;
