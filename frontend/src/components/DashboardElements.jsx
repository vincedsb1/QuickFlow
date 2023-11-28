import React from "react";

function DashboardElements() {
  return (
    <div className="dashboard h-screen flex flex-col">
      <div className="dashboard-bar h-16 flex items-center justify-center border-solid border-b-2 border-slate-300 px-4 max-w-8xl">
        <ul className="flex space-x-4 ml-10">
          <li>
            <button
              className="hover:text-emerald-500 focus:text-emerald-500 focus:underline"
              type="button" // Ajout de l'attribut type
            >
              À voter
            </button>
          </li>
          <li>
            <button
              className="hover:text-emerald-500 focus:text-emerald-500 focus:underline"
              type="button" // Ajout de l'attribut type
            >
              Décisions en cours
            </button>
          </li>
          <li>
            <button
              id="element-terminé"
              className="hover:text-emerald-500 focus:text-emerald-500 focus:underline"
              type="button" // Ajout de l'attribut type
            >
              Terminées
            </button>
          </li>
        </ul>
        <button
          className="ml-auto mr-10 border-solid border-2 border-emerald-500 rounded-full px-4 py-2"
          type="button" // Ajout de l'attribut type
        >
          <span className="text-emerald-500 px-2">Proposer une idée</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardElements;
