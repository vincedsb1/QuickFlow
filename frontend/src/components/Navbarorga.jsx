import React from "react";
import MenuUser from "./MenuUser";

function NavbarOrga() {
  return (
    <div
      id="navbar-alternative-container"
      className="bg-white h-16 border-solid border-b border-slate-300 flex justify-center items-center px-4"
    >
      <div
        id="navbar-alternative-wrapper-content"
        className="flex flex-row justify-between items-center w-full max-w-7xl"
      >
        <img
          id="navbar-alternative-logo"
          src="../assets/logos/logo-quickflow.svg"
          alt="logo-QuickFlow"
          className="w-25"
        />
        <div className="flex gap-8">
          <div id="NavbarOrga" className="flex items-center gap-10" />
          <div>
            <MenuUser />
          </div>
        </div>
      </div>
    </div>
  );
}
//
export default NavbarOrga;
