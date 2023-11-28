import { NavLink } from "react-router-dom";
import quickflow from "../../assets/logos/logo-quickflow.svg";

function NotFound() {
  return (
    <div className="App bg-slate-100 h-screen px-5">
      <div id="logo-box" className="flex justify-center">
        <img
          id="logo"
          src={quickflow}
          alt="logo quickflow"
          className="w-2/5 py-5 max-w-xs"
        />
      </div>
      <div className="bg-white shadow-md rounded-md p-3 pb-6 mb-6 border-solid border border-slate-300 max-w-5xl m-auto">
        <h1 className="ont-titles text-3xl font-bold">
          Oops ! Vous vous êtes perdu...
        </h1>
        <br />
        <p className="font-texts text-[22px]">
          Nous vous invitons à vous connecter à nouveau.
        </p>
        <br />
        <div className="flex justify-center">
          <NavLink to="/">
            <button
              className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100"
              type="button"
            >
              Retour à l'accueil
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
