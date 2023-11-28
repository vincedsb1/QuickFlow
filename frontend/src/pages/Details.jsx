import { FiClock } from "react-icons/fi";
import { BsCalendar } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Vote from "../components/Idea/Vote";
import Header from "../components/Header";
import Commentaries from "./commentaries/Commentaries";
import UserContext from "../contexts/UserContext";

function Details() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [imageData, setImageData] = useState();
  const { id } = useParams();
  const [vote, setVote] = useState(data?.[0]?.vote);
  const [votantState, setVotantState] = useState(null);
  const location = useLocation();

  // Récuparation des détails de l'idée

  useEffect(() => {
    if (id && id !== undefined) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/idee/${id}/details`)
        .then((response) => {
          const ideaData = response.data;
          setData(ideaData);
          setVotantState(ideaData?.[0]?.votant);
        });
    }
  }, [id]);

  // Récupération des liens des images

  useEffect(() => {
    if (id && id !== undefined) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/orga/idee/${id}/photo`)
        .then((responseImages) => {
          const imageDataFromResponse = responseImages.data;
          setImageData(imageDataFromResponse); // Change this line
        });
    }
  }, [id]);

  // Récupération des informations de l'user auteur de l'idée

  useEffect(() => {
    if (id && id !== undefined) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/idee/${id}`, { headers })
        .then((responseUser) => {
          const userDataFromResponse = responseUser.data;
          setUserData(userDataFromResponse);
        });
    }
  }, [id]);

  // console.log("L'uRL de ma photo est : ",data);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  };

  const handleVoteChange = (newVoteValue) => {
    setVote(newVoteValue);
  };

  const handleVotantChange = (newVotantValue) => {
    setVotantState(newVotantValue);
  };

  /*----------------------------------------------------
Récupération des commentaires
------------------------------------------------------*/
  const [comms, setComms] = useState([]);
  const ideeId = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/idee/${ideeId.id}/comment`)
      .then((res) => {
        setComms(res.data);
      })
      .catch((err) => console.error(err));
  }, [comms]);

  /*--------------------------------------------------*/

  return (
    <div>
      <Header />

      <main id="page-idée" className="bg-slate-100 justify-center md:p-8">
        <div id="contentContainer" className="max-w-7xl w-full m-auto ">
          <div
            id="HeaderIntroIdea"
            className="flex flex-col w-full bg-white md:rounded-lg"
          >
            <div id="EndVoteContainer" className="mt-8 mx-8">
              <div
                id="EndTimingVote"
                className="flex flex-col rounded-lg bg-slate-200 h-16 w-full mx-auto items-center justify-center mb-8"
              >
                <div
                  id="EndTimingVoteText"
                  className="flex items-center text-center font-texts text-md xl:text-xl"
                >
                  <FiClock className="mr-3" />
                  <p className="">Fin du vote : </p>{" "}
                  <p className="font-bold">
                    {" "}
                    &nbsp;{formatDate(data?.[0]?.date_limite)}
                  </p>
                </div>
              </div>
            </div>
            <div id="HeaderIntroContainer" className="flex flex-row">
              <div
                id="HeaderImageContainer"
                className="hidden md:block w-2/5 p-8  flex justify-center items-center"
              >
                <img
                  src={imageData?.[0]?.lien}
                  alt="IdeaPicture"
                  className="max-w-72 max-h-52 md:rounded-md"
                />
              </div>

              <div
                id="HeaderTextContainer"
                className="w-full flex flex-col justify-center  h-md px-10"
              >
                <div
                  id="HeaderVoteComm"
                  className="w-full flex flex-row justify-center md:justify-between"
                >
                  <div id="HeaderVote" className="">
                    {data?.[0] && (
                      <Vote
                        ideaId={Number(id)}
                        titre={data?.[0]?.titre}
                        vote={vote || data?.[0]?.vote}
                        votant={votantState || data?.[0]?.votant}
                        onVoteChange={handleVoteChange}
                        onVotantChange={handleVotantChange}
                        currentPage={location.pathname}
                      />
                    )}
                  </div>
                  <div id="HeaderComm" className=" " />
                </div>

                <div
                  id="HeaderTitleIdea"
                  className="font-texts font-bold text-3xl  py-4 text-center md:text-justify"
                >
                  <p>{data?.[0]?.titre}</p>
                </div>
                <div
                  id="HeaderUserInfosContainer"
                  className="flex flew row items-center justify-center md:justify-normal"
                >
                  <div id="HeaderUserPhoto" className="p-4">
                    <img
                      src={user && user.photoProfil}
                      alt="Secondary "
                      className="rounded-full w-[54px] h-[54px] object-cover"
                    />
                  </div>
                  <div
                    id="HeaderUserInfos"
                    className="flex flex-col justify-center "
                  >
                    <div id="HeaderUserPropulsedBy" className="p-1">
                      <p
                        id="proposéPar"
                        className="font-texts text-sm text-slate-600"
                      >
                        Proposé par &nbsp;
                        <span className="font-texts font-bold">
                          {userData?.[0]?.prenom} {userData?.[0]?.nom}
                        </span>
                      </p>
                    </div>
                    <div
                      id="HeaderUserMemberSince"
                      className="flex items-center text-slate-600 p-1"
                    >
                      <div id="HeaderUserMemberSinceIcon" className="pr-2">
                        <BsCalendar className="text-xl" />
                      </div>
                      <div
                        id=" date_inscription"
                        className="font-texts text-sm"
                      >
                        <p className="">
                          Membre depuis {formatDate(data?.[0]?.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div id="nombre_commentaire" className="bg-white transform scale-125 flex gap-2 justify-center md:justify-end">
                  <RiMessage2Line />
                  <div>{data?.nb_like_commentaire}</div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full mt-8 h-fit min-h[300px] overflow-y-auto flex justify-center md:hidden">
            <div
              id="HeaderImageContainer"
              className="flex justify-center items-center "
            >
              <img
                src={imageData?.[0]?.lien}
                alt="IdeaPicture"
                className="md:rounded-md object-contain w-full max-h-80"
              />
            </div>
          </div>

          <div className="w-full bg-white md:rounded-lg mt-8 mx-auto h-fit min-h[300px] overflow-y-auto">
            <div>
              <p className="text-slate-900 font-texts font-bold text-2xl md:text-3xl leading-[29px] p-8">
                Contenu
              </p>
            </div>
            <div>
              <p className="text-slate-700 font-texts text-lg md:text-lg leading-[26.4px] px-8 py-4">
                {data?.[0]?.contenu}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:gap-8 mt-8 ">
            <div className="bg-white w-full md:w-[calc(50% - 0.75rem)] md:rounded-lg min-h-[213px]  h-fit mt-8 md:mt-0 ">
              <div>
                <p className="text-slate-900 font-texts font-bold text-2xl leading-[29px] p-8">
                  Utilité
                </p>
              </div>
              <div>
                <p className="text-slate-700 font-texts text-lg md:text-lg leading-[26.4px] px-8 py-4">
                  {data?.[0]?.utilite}
                </p>
              </div>
            </div>
            <div className="bg-white w-full md:w-[calc(50% - 0.75rem)] md:rounded-lg min-h-[213px] h-fit mt-8 md:mt-0">
              <div>
                <p className="text-slate-900 font-texts font-bold text-2xl leading-[29px] p-8">
                  Contexte
                </p>
              </div>
              <p className="text-slate-700 font-texts text-lg md:text-lg leading-[26.4px] px-8 py-4 overflow-y-auto">
                {data?.[0]?.contexte}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:gap-8 mt-8">
            <div className="bg-white w-full md:rounded-lg min-h-[213px] h-fit">
              <div>
                <p className="text-slate-900 font-texts font-bold text-2xl p-8">
                  Bénéfices
                </p>
              </div>
              <p className="text-slate-700 font-texts text-lg leading-[26.4px] px-8 py-4 overflow-y-auto">
                {data?.[0]?.benefice}
              </p>
            </div>
            <div className="bg-white w-full md:w-[calc(50% - 0.75rem)] md:rounded-lg min-h-[213px] h-fit mt-8 md:mt-0">
              <div>
                <p className="text-slate-900 font-texts font-bold text-2xl p-8">
                  Inconvénients
                </p>
              </div>
              <p className="text-slate-700 font-texts text-lg leading-[26.4px] ml-8 mr-4">
                {data?.[0]?.inconvenient}
              </p>
            </div>
          </div>
          <div>
            <Commentaries
              comms={comms}
              setComms={setComms}
              ideeId={parseInt(ideeId.id, 10)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;
