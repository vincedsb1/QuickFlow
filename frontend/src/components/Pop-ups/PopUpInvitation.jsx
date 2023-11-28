import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function PopUpInvitation({ popUpContent, setPopUp }) {
  const popupInvitRef = useRef(false);

  // ici, on gère le désaffichage de la pop-up au clic
  useEffect(() => {
    function hidePopupInvit(e) {
      if (!popupInvitRef.current.contains(e.target)) {
        setPopUp(false);
      }
    }
    document.addEventListener("mousedown", hidePopupInvit);
    return () => {
      document.removeEventListener("mousedown", hidePopupInvit);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 z-50 h-full w-full bg-slate-300 bg-opacity-80">
      <div
        ref={popupInvitRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-200 border border-solid w-auto bg-white border-slate-300 p-5 m-5 rounded-lg  "
      >
        <p>{popUpContent}</p>
      </div>
    </div>
  );
}

PopUpInvitation.propTypes = {
  popUpContent: PropTypes.string.isRequired,
  setPopUp: PropTypes.func.isRequired,
};

export default PopUpInvitation;
