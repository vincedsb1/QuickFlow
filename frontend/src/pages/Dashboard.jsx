import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Idea from "../components/Idea/Idea";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import OrgaContext from "../contexts/OrgaContext";
import EmptyDashboard from "./EmptyDashboard";
import LastIdeasContainer from "../components/LastIdeasContainer";

function Dashboard() {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState("vote");
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { orgaContext } = useContext(OrgaContext);
  const [refreshCount, setRefreshCount] = useState(0);

  const updateExpiredIdeas = (ideas) => {
    ideas.forEach((idea) => {
      const currentDate = new Date();
      const expirationDate = new Date(idea.date_limite);
      expirationDate.setHours(23, 59, 59);
      if (expirationDate < currentDate && idea.statuts_id === 1) {
        const updatedIdea = {
          finalStatusLabel: "",
          statusId: 2,
        };
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        axios
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/orga/${orgaContext}/update/${
              idea.id
            }`,
            updatedIdea,
            { headers }
          )
          .then((response) => {
            console.info(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const refreshIdeas = () => {
    setRefreshCount((count) => count + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${
            user.id
          }/orga/${orgaContext}/dashboard/${endpoint}`
        );

        const ideaData = response.data;

        setData(ideaData);
        updateExpiredIdeas(ideaData);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [endpoint, user, orgaContext, refreshCount]);

  return (
    <div className="App h-fit min-h-screen bg-slate-100">
      <div id="header">
        <Header setEndpoint={setEndpoint} />
      </div>
      {endpoint === "vote" && data.length === 0 ? (
        <EmptyDashboard orgaId={orgaContext} />
      ) : (
        <>
          <div id="navbar">
            <Navbar setEndpoint={setEndpoint} currentEndpoint={endpoint} />
          </div>
          <div id="dashboardContainer" className="flex justify-center">
            <div
              id="dashboardIdeaContainer"
              className="max-w-7xl h-full w-full xl:w-[1280px] flex flex-row justify-center"
            >
              <div
                id="dashboardIdeas"
                className="flex flex-col items-center mx-4 pb-16  w-full xl:w-3/5 xl:m-0"
              >
                {data.map((el) => (
                  <Idea
                    key={el.id}
                    ideaId={el.id}
                    titre={el.titre}
                    status={el.status}
                    contenu={el.contenu}
                    vote={el.vote}
                    votant={el.votant}
                    endpoint={endpoint}
                    currentPage={location.pathname}
                    updateExpiredIdeas={() => updateExpiredIdeas([el])}
                    deadline={el.date_limite}
                    refreshIdeas={refreshIdeas}
                  />
                ))}
              </div>
              <div id="dashboardLastIdeas" className="hidden xl:block w-2/5 ">
                <LastIdeasContainer />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
//
