import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function EmptyDashboard({ orgaId }) {
  const [orgaData, setOrgaData] = useState([null]);

  useEffect(() => {
    if (orgaId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/orga/${orgaId}`)
        .then((response) => {
          const orgaResponse = response.data;
          setOrgaData(orgaResponse);
        });
    }
  }, [orgaId]);

  if (!orgaData) {
    return null;
  }
  return (
    <div className="App h-screen bg-slate-100">
      <div id="dashboardContainer" className="flex justify-center h-5/6">
        <div
          id="dashboardIdeaContainer"
          className="max-w-7xl h-full w-[1280px] flex justify-center"
        >
          <div
            id="emptyDashboardCard"
            className="max-w-7xl bg-white m-4 rounded-2xl shadow w-full flex-col m-24"
          >
            <div
              id="titleGroup"
              className="flex flex-row justify-between items-center p-4"
            >
              <div id="ideaTitle" className="text-3xl font-titles font-bold">
                {orgaData && orgaData[0] && orgaData[0].nom_organisation}
              </div>
            </div>
            <div
              id="emptydashboardContent"
              className="h-full w-full flex flex-col items-center justify-center pb-32"
            >
              <div>
                <p>Ajoutez votre première idée au projet</p>
              </div>
              <NavLink to="/newidea">
                <button
                  type="button"
                  className="relative inline-flex h-14 w-72 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-4"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#34d399_0%,#059669_50%,#34d399_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-lg text-emerald-500 font-titles font-bold backdrop-blur-3xl">
                    Ajouter une idée
                  </span>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EmptyDashboard.propTypes = {
  orgaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

EmptyDashboard.defaultProps = {
  orgaId: 0,
};

export default EmptyDashboard;
//
