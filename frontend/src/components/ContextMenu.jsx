import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiSettings, FiLogOut, FiGlobe } from "react-icons/fi";
import UserContext from "../contexts/UserContext";
import RoleContext from "../contexts/RoleContext";

function ContextMenu() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { roleContext } = useContext(RoleContext);

  const logOutOrga = () => {
    localStorage.removeItem("orgaContext");
    localStorage.removeItem("roleContext");
    navigate("/choose_organisation");
  };

  const logOut = () => {
    setUser(null);
    localStorage.clear();
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="w-60 absolute mt-2 rounded-md py-5 px-7 text-base drop-shadow-lg border bg-white font-bold text-slate-900 origin-right -translate-x-3/4 z-10">
      <NavLink to="/account">
        <div className="flex items-center gap-3 mb-1  hover:text-emerald-500 duration-300">
          <FiUser />
          <p className="font-title hover:cursor-pointer text-base font-bold">
            Mon compte
          </p>
        </div>
      </NavLink>
      <NavLink to="/choose_organisation">
        <div className="flex items-center gap-3 mb-1 hover:text-emerald-500 duration-300">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={logOutOrga}
          >
            <FiGlobe />
            <p className="font-title hover:cursor-pointer text-base font-bold">
              Mes organisations
            </p>
          </button>
        </div>
      </NavLink>
      {roleContext &&
      roleContext.find((e) => {
        if (e.role === "admin") {
          return e.check_role;
        }
        return null;
      }) ? (
        <NavLink to="/settings">
          <div className="flex items-center gap-3 mb-1 hover:text-emerald-500 duration-300">
            <FiSettings />
            <p className="font-title hover:cursor-pointer text-base font-bold">
              Paramètres
            </p>
          </div>
        </NavLink>
      ) : (
        ""
      )}

      <div id="separator" className="w-full h-[1px] bg-slate-200 my-3" />
      <NavLink to="/">
        <button
          type="button"
          onClick={logOut}
          className="flex items-center gap-3 hover:text-red-500 duration-300"
        >
          <FiLogOut />
          <p className="font-title hover:cursor-pointer text-base font-bold">
            Se déconnecter
          </p>
        </button>
      </NavLink>
    </div>
  );
}
//
export default ContextMenu;
