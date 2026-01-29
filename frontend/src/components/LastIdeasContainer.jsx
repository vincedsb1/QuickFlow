import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import OrgaContext from "../contexts/OrgaContext";
import SmallIdea from "./Idea/SmallIdea";

function LastIdeasContainer() {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const { orgaContext } = useContext(OrgaContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}/orga/${orgaContext}/last/vote`
        );
        const lastIdeaData = response.data;
        setData(lastIdeaData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      id="smallIdeasContainer"
      className="max-w-2xl bg-white mt-4 mr-10 pb-4 rounded-2xl shadow flex-col"
    >
      <div
        id="smallIdeasContainerTitle"
        className="text-xl font-titles font-bold pl-4 pt-8 pb-6"
      >
        <p>Dernières idées</p>
      </div>
      <div id="smallIdeasContainerIdeas" className=" px-4">
        {data.map((el) => (
          <SmallIdea
            key={el.id}
            ideaId={el.id}
            titre={el.titre}
            vote={el.vote}
          />
        ))}
      </div>
    </div>
  );
}

export default LastIdeasContainer;
