import React, { useEffect, useState, useRef, useContext } from "react";
import { SlArrowDown } from "react-icons/sl";
import { NavLink, useLocation } from "react-router-dom";
import ContextMenu from "./ContextMenu";
import UserContext from "../contexts/UserContext";

function MenuUser() {
  const { user } = useContext(UserContext);
  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const contextMenuRef = useRef(false);
  const location = useLocation();
  const isOnDetailsPage = location.pathname.startsWith("/details/");

  const handleClick = () => {
    // ouvrir le menu contextuel quand l'utilisateur clique sur le menu user
    setDisplayContextMenu((currentBolean) => !currentBolean);
  };

  useEffect(() => {
    // fermer le menu contextuel quand il est ouvert et que l'utilisateur clique en dehors du menu
    function hideContextMenu(e) {
      if (!contextMenuRef.current.contains(e.target)) {
        setDisplayContextMenu(false);
      }
    }
    document.addEventListener("mousedown", hideContextMenu);
    return () => {
      document.removeEventListener("mousedown", hideContextMenu);
    };
  }, []);

  return (
    <div className="flex flex-row items-center">
      <div className="pr-4">
        {isOnDetailsPage && (
          <NavLink to="/dashboard">
            <p
              id="publish-idea-cancel-creation"
              className="text-base font-semibold text-slate-900"
            >
              Fermer
            </p>
          </NavLink>
        )}
      </div>
      <button
        onClick={handleClick}
        type="button"
        tabIndex={0}
        className="flex items-center justify-end flex-row gap-3 relative"
      >
        <img
          src={
            user && user.photoProfil.startsWith("http")
              ? user.photoProfil
              : `${import.meta.env.VITE_BACKEND_URL}${user && user.photoProfil}`
          }
          alt="PP"
          className="w-10 h-10 object-cover rounded-full"
        />
        <SlArrowDown className="text-slate-900" />
      </button>
      <div ref={contextMenuRef}>
        {displayContextMenu ? <ContextMenu /> : null}
      </div>
    </div>
  );
}
//
export default MenuUser;
