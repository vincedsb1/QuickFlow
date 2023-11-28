import React from "react";
import { NavLink } from "react-router-dom";

function CloseButton() {
  return (
    <div className=" flex md:justify-normal justify-center">
      <NavLink to="/dashboard">
        <button
          id="saveButton"
          className="text-emerald-600 font-texts text-base font-bold ml-auto  px-4 py-2"
          type="button"
        >
          Fermer
        </button>
      </NavLink>
    </div>
  );
}

export default CloseButton;
