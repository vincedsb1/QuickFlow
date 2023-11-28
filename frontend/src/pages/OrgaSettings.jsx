import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import Header from "../components/Header";
import SettingsHeader from "../components/SettingsHeader";
import ActionButtons from "../components/ActionButtons/ActionButtons";
import InvitOrga from "../components/Invitation/InvitOrga";
import OrgaContext from "../contexts/OrgaContext";

function OrgaSettings() {
  const [orgId, setOrgId] = useState(0);
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState();
  const { orgaContext } = useContext(OrgaContext);
  const [titleOrg, setTitleOrg] = useState("");
  const inputRef = useRef();
  const [editMode, setEditMode] = useState(false);

  const [orgaName, setOrgaName] = useState();
  const [voteDuration, setVoteDuration] = useState();
  const [orgaVotePositifs, setOrgaVotePositifs] = useState();
  const [orgaDisplayDoneIdea, setOrgaDisplayDoneIdea] = useState();
  const [orgaAllowAnonymousComment, setOrgaAllowAnonymousComment] = useState();
  const token = localStorage.getItem("token");

  const handleOrgaNameChange = (e) => {
    setOrgaName(e.target.value);
  };
  const handleVoteDurationChange = (e) => {
    setVoteDuration(e.target.value);
  };
  const handleOrgaVotePositifsChange = (e) => {
    setOrgaVotePositifs(e.target.value);
  };
  const handleOrgaDisplayDoneIdeaChange = (e) => {
    setOrgaDisplayDoneIdea(e.target.value);
  };

  const handleFileUpdate = (newTitleOrg, newLogo) => {
    if (!newTitleOrg || !newLogo) {
      console.error("newTitleOrg or newLogo is not defined");
      return;
    }

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/orga/logo/${orgaContext}`,
        { titleOrg: newTitleOrg, logo: newLogo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // .then((response) => console.info(response))
      .catch((err) => {
        console.error("Erreur HandleFileUpdate", err);
      });
  };

  // -----------------------
  //  modification de l'image
  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append("logo", inputRef.current.files[0]);

    const file = event.target.files[0];
    const newTitleOrg = data.nom_organisation;
    const newLogo = `${import.meta.env.VITE_BACKEND_URL}/photo/organisation/${
      file.name
    }`;

    const logoUrl = new URL(data.logo);
    const filename = logoUrl.pathname.split("/").pop();

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/orga/delete/${filename}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/orga/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitleOrg(newTitleOrg);
      setLogo(newLogo);
      handleFileUpdate(newTitleOrg, newLogo);
    } catch (err) {
      console.warn(err);
    }
  };

  // ----------------------

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/orga/${orgaContext}`, {
        headers,
      })
      .then((response) => {
        setOrgId(parseInt(orgaContext, 10));
        const orgaData = response.data;
        if (orgaData && orgaData.length > 0) {
          setData(orgaData[0]);
          setOrgaName(orgaData[0]?.nom_organisation);
          setVoteDuration(orgaData[0]?.duree_des_votes);
          setOrgaVotePositifs(orgaData[0]?.ratio_vote_positif);
          setOrgaDisplayDoneIdea(orgaData[0]?.periode_idee_terminee);
          setOrgaAllowAnonymousComment(orgaData[0]?.anonyme);
        }
      });
  }, [orgaContext]);

  const handleSubmit = () => {
    setEditMode(false);

    const payload = {
      orgName: orgaName,
      voteTime: voteDuration,
      ratioVote: orgaVotePositifs,
      isAnonyme: orgaAllowAnonymousComment,
      periode: orgaDisplayDoneIdea,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/orga/${orgaContext}/params`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.info("Modification des données réussie", response);
      })
      .catch((err) => {
        console.error("Erreur lors de la modification des données", err);
      });
  };

  return (
    <div className="App relative md:min-h-screen bg-slate-100 flex flex-col items-center">
      <div id="OrgaHeader" className="w-full">
        <Header />
      </div>
      <div id="OrgaSettingsHeader" className="w-full">
        <SettingsHeader orgaName={titleOrg || orgaName} data={data.logo} />
      </div>
      <div
        id="OrgaSettingsContainer"
        className="flex-grow md:max-w-7xl xl:w-[1280px] flex flex-col items-center"
      >
        <div
          id="OrgaSettingsCard"
          className="md:max-w-5/6 bg-white md:m-16 md:rounded-2xl md:5/6 flex flex-col flex-grow"
        >
          <div
            id="OrgaSettingsContentGlobal"
            className="flex flex-row flex-grow justify-between"
          >
            <div
              id="OrgaSettingsContentText"
              className="flex flex-col md:w-2/3 mx-8 md:mx-24 my-8 md:my-16 "
            >
              {editMode ? (
                <div id="OrgaSettingsOrgaContainer" className="flex flex-col">
                  <div id="OrgaSettingsNameContainer" className="flex flex-col">
                    <div
                      id="OrgaSettingsNameLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Nom de l'organisation
                    </div>
                    <div className="flex flex-row items-center mb-1">
                      <input
                        type="text"
                        className="bg-gray-100 text-gray-900 font-texts font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={orgaName}
                        onChange={handleOrgaNameChange}
                      />
                    </div>
                  </div>
                  <div
                    id="OrgaSettingsVoteDurationContainer"
                    className="flex flex-col"
                  >
                    <div
                      id="OrgaSettingsVoteDurationLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Durée maximum des votes
                    </div>
                    <div className="flex flex-row items-center mb-1">
                      <input
                        type="text"
                        className="bg-gray-100 text-gray-900 font-texts font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 text-center"
                        defaultValue={voteDuration}
                        onChange={handleVoteDurationChange}
                      />
                      <span className="pl-2"> jours </span>
                    </div>
                  </div>
                  <div
                    id="OrgaSettingsRatioPositiveVotes"
                    className="flex flex-col mb-6"
                  >
                    <div
                      id="OrgaSettingsVotePositifsLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Ratio de votes positif pour accepter l’idée
                    </div>
                    <div className="flex flex-row items-center mb-1 ">
                      <input
                        type="text"
                        className="bg-gray-100 text-gray-900 font-texts font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 text-center"
                        defaultValue={orgaVotePositifs}
                        onChange={(e) => handleOrgaVotePositifsChange(e)}
                      />
                      <span className="pl-2"> %</span>
                    </div>
                    <div
                      id="OrgaSettingsOrgaDisplayDoneIdeaContainer"
                      className="flex flex-col"
                    >
                      <div
                        id="OrgaSettingsOrgaDisplayDoneIdeaLabel"
                        className="font-texts text-base text-slate-500 "
                      >
                        Période d’affichage des idées terminées
                      </div>
                      <div className="flex flex-row items-center mb-1">
                        <input
                          type="text"
                          className="bg-gray-100 text-gray-900 font-texts font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 text-center"
                          defaultValue={orgaDisplayDoneIdea}
                          onChange={(e) => {
                            handleOrgaDisplayDoneIdeaChange(e);
                          }}
                        />
                        <span className="pl-2"> jours </span>
                      </div>
                    </div>
                    <div
                      id="OrgaSettingsAllowAnonymousCommentContainer"
                      className="flex flex-col mb-7"
                    >
                      <div
                        id="OrgaSettingsAllowAnonymousCommentLabel"
                        className="font-texts text-base text-slate-500 "
                      >
                        Autoriser commentaires anonymes
                      </div>
                      <div
                        id="OrgaSettingsAllowAnonymousComment"
                        className=""
                      />
                      {orgaAllowAnonymousComment === 1 ? (
                        <BsCheckSquare
                          className=" text-slate-800 text-2xl  ml-2 mt-1"
                          onClick={() => setOrgaAllowAnonymousComment(0)}
                        />
                      ) : (
                        <BsSquare
                          className=" text-slate-800 text-2xl ml-2 mt-1"
                          onClick={() => setOrgaAllowAnonymousComment(1)}
                        />
                      )}
                    </div>
                    <div
                      id="OrgaSettingsUserRightsLabel"
                      className="font-texts text-base text-slate-500 mt-4"
                    >
                      Utilisateurs
                    </div>
                    <NavLink to="/settings/management">
                      <div
                        id="OrgaSettingsUserRights"
                        className="font-texts text-base text-sky-600 font-bold"
                      >
                        Gérer les droits des utilisateurs
                      </div>
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div
                  id="OrgaSettingsOrgaContainer"
                  className="flex flex-col mb-6"
                >
                  <div
                    id="OrgaSettingsOrgaNameContainer"
                    className="flex flex-col mb-7"
                  >
                    <div
                      id="OrgaSettingsOrgaNameLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Nom de l'organisation
                    </div>
                    <div
                      id="OrgaSettingsOrgaName"
                      className="text-gray-900 font-texts"
                    >
                      {orgaName}
                    </div>
                  </div>
                  <div
                    id="OrgaSettingsVoteDurationContainer"
                    className="flex flex-col mb-7"
                  >
                    <div
                      id="OrgaSettingsVoteDurationLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Durée maximum des votes
                    </div>
                    <div
                      id="OrgaSettingsVoteDuration"
                      className="text-gray-900 font-texts"
                    >
                      {voteDuration} jours
                    </div>
                  </div>
                  <div
                    id="OrgaSettingsRatioPositiveVotes"
                    className="flex flex-col mb-7"
                  >
                    <div
                      id="OrgaSettingsVotePositifsLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Ratio de votes positif pour accepter l’idée
                    </div>
                    <div
                      id="OrgaSettingsVotePositifs"
                      className="text-gray-900 font-texts font-bold text-xl"
                    />
                    {orgaVotePositifs} %
                  </div>
                  <div
                    id="OrgaSettingsOrgaDisplayDoneIdeaContainer"
                    className="flex flex-col mb-7"
                  >
                    <div
                      id="OrgaSettingsOrgaDisplayDoneIdeaLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Période d’affichage des idées terminées
                    </div>
                    <div
                      id="OrgaSettingsOrgaDisplayDoneIdea"
                      className="font-texts text-sky-600 font-bold text-xl "
                    />
                    {orgaDisplayDoneIdea} jours
                  </div>
                  <div
                    id="OrgaSettingsAllowAnonymousCommentContainer"
                    className="flex flex-col mb-7"
                  >
                    <div
                      id="OrgaSettingsAllowAnonymousCommentLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Autoriser commentaires anonymes
                    </div>
                    <div
                      id="OrgaSettingsAllowAnonymousComment"
                      className="font-texts text-slate-800 font-bold text-xl "
                    />
                    {orgaAllowAnonymousComment === 1 ? (
                      <BsCheckSquare className=" text-slate-400 text-2xl  ml-2 mt-1" />
                    ) : (
                      <BsSquare className=" text-slate-400 text-2xl ml-2 mt-1" />
                    )}
                  </div>
                  <div
                    id="OrgaSettingsUserRightsLabel"
                    className="font-texts text-base text-slate-500 mt-4"
                  >
                    Utilisateurs
                  </div>
                  <NavLink to="/settings/management">
                    <div
                      id="OrgaSettingsUserRights"
                      className="font-texts text-base text-sky-600 font-bold"
                    >
                      Gérer les droits des utilisateurs
                    </div>
                  </NavLink>
                  <div className="pt-8">
                    <InvitOrga orgId={orgId} orgaName={orgaName} />
                  </div>
                </div>
              )}
            </div>
            <div
              id="OrgaSettingsOrgaPhotoContainer"
              className="hidden md:block flex flex-col md:w-1/3 justify-center items-center md:mr-8 "
            >
              <div className=" h-full flex flex-col justify-center items-center">
                <div
                  id="OrgaSettingsOrgaPhoto"
                  className=" h-64 w-64 rounded-full border-solid border-4 border-slate-300 flex items-center justify-center "
                >
                  <img
                    src={logo || data.logo}
                    className="max-h-56 h-auto w-auto max-w-56 mb-2 p-8"
                    alt="user"
                  />
                </div>
                <div className="font-texts text-base text-sky-600 font-bold pt-2">
                  <label
                    htmlFor="settingsEditPhoto"
                    className="font-bold cursor-pointer hover:text-emerald-600 text-lg"
                  >
                    Modifier
                  </label>
                  <input
                    id="settingsEditPhoto"
                    className="w-full hidden"
                    type="file"
                    onChange={handleFileChange}
                    ref={inputRef}
                    name="logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="SettingsButtonContainer"
            className="h-24 flex items-center justify-center"
          >
            <ActionButtons
              editMode={editMode}
              onEdit={() => setEditMode(true)}
              onSave={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgaSettings;
