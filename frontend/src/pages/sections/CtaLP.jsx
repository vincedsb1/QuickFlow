import React from "react";
import { NavLink } from "react-router-dom";

function CtaLP() {
  return (
    <div className="h-fit py-20 bg-gray-100">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-4xl sm:text-6xl font-bold font-titles tracking-tighter text-slate-900">
            Votre temps n'attend plus
          </h2>
          <p className="sm:text-2xl text-xl text-center text-slate-700">
            Mettez de l'ordre dans votre chaos 🔥
          </p>
        </div>
        <div className="flex flex-col justify-center sm:flex-row gap-4 sm:gap-10 px-3 w-full">
          <NavLink to="/inscription">
            <button
              type="button"
              className="text-lg w-full font-bold font-titles bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100 px-16 py-3 rounded-full sm:w-fit"
            >
              Démarrer
            </button>
          </NavLink>
          <NavLink to="/login">
            <button
              type="button"
              className="text-lg w-full font-bold font-titles text-emerald-500 bg-white border-solid border-2 rounded-full px-10 py-3 sm:w-fit"
            >
              Se connecter
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CtaLP;
