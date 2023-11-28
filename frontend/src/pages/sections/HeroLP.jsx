import React from "react";
import { NavLink } from "react-router-dom";

function HeroLP() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div
        id="navbar"
        className="px-3 py-3 flex items-center justify-between w-full max-w-7xl m-auto"
      >
        <div>
          <img
            src="../../assets/logos/logo-quickflow.svg"
            alt="logo-quickflow"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/login"
            className="text-base text-slate-800 font-semibold m-auto cursor-pointer"
          >
            Se connecter
          </NavLink>
          <NavLink to="/inscription">
            <button
              type="button"
              className="text-base font-bold font-titles bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100 px-4 py-2 sm:px-8 sm:py-2 rounded-full"
            >
              Démarrer
            </button>
          </NavLink>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center flex-grow"
        id="hero-content"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-4xl sm:text-7xl font-bold font-titles tracking-tighter text-slate-900 px-3">
                Décider à plusieurs, <br /> devient un jeu d'enfants.
              </h1>
              <h4 className="sm:text-2xl max-w-2xl text-xl text-center text-slate-700 px-3">
                Nous aidons les organisations à accélérer leurs prises de
                décisions collectives et gagner du temps précieux.
              </h4>
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
      </div>
      <div>
        <img
          src="../../assets/images/quickflow-frame.svg"
          alt="background-frame"
          className="absolute top-0 w-full h-full animate-spin-vertical-horizontal -z-10"
        />
      </div>
    </div>
  );
}

export default HeroLP;
