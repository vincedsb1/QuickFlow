import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import PublishIdea from "./PublishIdea";
import MenuUserAlternative from "./MenuUserAlternative";

function NavbarAlternative({ onSubmit }) {
  return (
    <div className="bg-white h-16 border-solid border-b border-slate-300 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <NavLink to="/dashboard">
          <img
            src="../assets/logos/favicon-quickflow.png"
            alt="logo-QuickFlow"
            className="w-8"
          />
        </NavLink>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-10">
            <PublishIdea onSubmit={onSubmit} />
          </div>
          <div className="hidden sm:flex">
            <MenuUserAlternative />
          </div>
        </div>
      </div>
    </div>
  );
}

NavbarAlternative.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NavbarAlternative;
