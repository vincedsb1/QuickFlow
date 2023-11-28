import { NavLink } from "react-router-dom";

function PopUpEmailSent() {
  return (
    <div className="flex absolute z-50 h-full w-full bg-slate-300 bg-opacity-80 ">
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-200 border border-solid w-auto bg-white border-slate-300 p-5 m-5 rounded-lg  ">
        <div className="p-2">
          <p>Vous avez reçu un email. Merci de vérifier Votre boîte mail.</p>
          <br />
          <NavLink to="/">
            <div className="flex justify-center">
              <button
                type="button"
                className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100"
              >
                Page d'accueil
              </button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default PopUpEmailSent;
