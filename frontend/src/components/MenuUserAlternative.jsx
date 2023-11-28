import React, { useEffect, useState, useRef, useContext } from "react";
import { SlArrowDown } from "react-icons/sl";
import ContextMenuAlternative from "./ContextMenuAlternative";
import UserContext from "../contexts/UserContext";

function MenuUserAlternative() {
  const { user } = useContext(UserContext);
  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const contextMenuRef = useRef(false);

  const handleClick = () => {
    // ouvrir le menu contextuel quand l'utilisateur clique sur le menu user
    if (displayContextMenu === false) {
      setDisplayContextMenu(true);
    }
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
    <div>
      <div
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}
        className="flex items-center justify-end flex-row gap-3 relative"
      >
        <img
          src={user && user.photoProfil}
          alt=""
          className="w-10 h-10 object-cover rounded-full"
        />
        <SlArrowDown className="text-slate-900" />
      </div>
      <div ref={contextMenuRef}>
        {displayContextMenu ? <ContextMenuAlternative /> : null}
      </div>
    </div>
  );
}

export default MenuUserAlternative;
