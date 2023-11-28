import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import logo from "../assets/logos/logo-quickflow.svg";
import MenuUser from "./MenuUser";

function Header({ setEndpoint }) {
  return (
    <div
      id="dashboard-bar"
      className="h-16 flex content-center justify-center border-solid border-b border-slate-300 px-4 max-w-8xl bg-white"
    >
      <div
        id="headerMenuContainer"
        className="flex flex-row items-center justify-between max-w-7xl w-full"
      >
        <div id="headerLogo" className="">
          <NavLink to="/dashboard" onClick={() => setEndpoint("vote")}>
            <img src={logo} alt="QuickFlow Logo" />
          </NavLink>
        </div>
        <div>
          <MenuUser />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  setEndpoint: PropTypes.func,
};

Header.defaultProps = {
  setEndpoint: () => {}, // default to a no-op function
};

export default Header;
//
