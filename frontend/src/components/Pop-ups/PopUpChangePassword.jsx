import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function PopUpChangePassword({ setPopUp, passwordIsModified }) {
  const popupWrongPasswordRef = useRef(false);

  // ici, on gère le désaffichage de la pop-up au clic
  useEffect(() => {
    function hidePopupWrongPassword(e) {
      if (!popupWrongPasswordRef.current.contains(e.target)) {
        setPopUp(false);
      }
    }
    document.addEventListener("mousedown", hidePopupWrongPassword);
    return () => {
      document.removeEventListener("mousedown", hidePopupWrongPassword);
    };
  }, []);

  return (
    <div className="flex absolute z-50 h-full w-full bg-slate-300 bg-opacity-80 ">
      <div
        ref={popupWrongPasswordRef}
        className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-200 border border-solid w-auto bg-white border-slate-300 p-5 m-5 rounded-lg  "
      >
        {passwordIsModified ? (
          <div className="p-2">
            <p className="font-texts text-[20px] opac ">Mot de passe modifié</p>
            <br />

            <div className="flex justify-center">
              <NavLink to="/login">
                <button
                  type="button"
                  className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100"
                >
                  Se connecter
                </button>
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-texts text-[20px] opac">
              Les mots de passe ne correspondent pas.
            </p>
            <br />
            <div className="flex justify-center">
              <button
                className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100"
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PopUpChangePassword.propTypes = {
  setPopUp: PropTypes.func.isRequired,
  passwordIsModified: PropTypes.bool.isRequired,
};

export default PopUpChangePassword;
