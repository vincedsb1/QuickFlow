import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import OrgaContext from "../contexts/OrgaContext";
import SettingsHeader from "../components/SettingsHeader";
import Header from "../components/Header";
import PopUpManagemntUser from "../components/Pop-ups/PopUpManagemntUser";
import PopUpDeleteUserByOrga from "../components/Pop-ups/PopUpDeleteUserByOrga";

function UserManagement() {
  const [data, setData] = useState([]);
  const [dataRole, setDataRole] = useState([]);

  const { orgaContext } = useContext(OrgaContext);
  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/orga/${orgaContext}`)
      .then((response) => {
        const orgaData = response.data;
        setData(orgaData[0]);
      });
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/orga/${orgaContext}/role`)
      .then((res) => {
        setDataRole(res.data);
      });
  }, [popUp, popUpDelete]);

  const dataMapName = [];
  const dataTemporaire = [];
  dataRole.forEach((el) => {
    if (!dataTemporaire.includes(el.user_id)) {
      dataTemporaire.push(el.user_id);
      dataMapName.push(el);
    }
  });
  const dataTemporaireRole = [];
  const dataRoleFilter = [];
  dataRole.forEach((el) => {
    if (!dataTemporaireRole.includes(el.user_id && el.role_id)) {
      dataTemporaireRole.push(el.user_id, el.role_id, el.organisation_id);
      dataRoleFilter.push(el);
    }
  });
  return (
    <div className="h-screen bg-slate-100">
      <div id="OrgaHeader">
        {popUp ? (
          <PopUpManagemntUser
            dataRole={dataRole}
            user={user}
            setPopUp={setPopUp}
            orgaContext={orgaContext}
          />
        ) : (
          ""
        )}
        <div>
          {popUpDelete ? (
            <PopUpDeleteUserByOrga
              user={user}
              setPopUp={setPopUpDelete}
              orgaContext={orgaContext}
            />
          ) : (
            ""
          )}
        </div>
        <Header />
      </div>
      <div id="OrgaSettingsHeader" className="w-full ">
        <SettingsHeader OrgaName={data.nom_organisation} data={data.logo} />
      </div>
      <div className=" flex justify-center item-center ">
        <div className="border p-8 bg-white m-16 rounded-2xl w-5/6 max-w-[1280px]">
          <div
            id="OrgaSettingsContainer"
            className="w-full flex flex-col items-around"
          >
            <div
              id="OrgaSettingsCard"
              className="  flex flex-row justify-around "
            >
              <div>
                <h2 className="m-5 mb-14 font-texts text-center  text-slate-500 font-bold">
                  Utilisateur
                </h2>
                <div>
                  {dataMapName.map((e) => {
                    return (
                      <p key={e.user_id} className="mb-5 font-texts font-bold">
                        {e.nom} {e.prenom}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2 className="m-5 font-texts text-center  text-slate-500 font-bold">
                  Rôles
                </h2>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col">
                    <h2 className="mb-5">Suppr. Comm.</h2>
                    {dataRole.map((e) => {
                      if (e.role === "supprimer commentaire")
                        return (
                          <input
                            key={e.user_id}
                            type="checkbox"
                            className=" checkBoxOff"
                            checked={e.check_role}
                            onChange={() => {}}
                            disabled
                          />
                        );

                      return null;
                    })}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="mb-5">Suppr. Idée</h2>
                    {dataRole.map((e) => {
                      if (e.role === "supprimer idée")
                        return (
                          <input
                            key={e.user_id}
                            type="checkbox"
                            className="checkBoxOff"
                            checked={e.check_role}
                            onChange={() => {}}
                            disabled
                          />
                        );

                      return null;
                    })}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="mb-5">Décisionaire</h2>
                    {dataRole.map((e) => {
                      if (e.role === "décisionnaire")
                        return (
                          <input
                            key={e.user_id}
                            type="checkbox"
                            className="checkBoxOff"
                            checked={e.check_role}
                            onChange={() => {}}
                            disabled
                          />
                        );

                      return null;
                    })}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="mb-5">Admin</h2>
                    {dataRole.map((e) => {
                      if (e.role === "admin")
                        return (
                          <input
                            key={e.user_id}
                            type="checkbox"
                            className="checkBoxOff"
                            checked={e.check_role}
                            onChange={() => {}}
                            disabled
                          />
                        );

                      return null;
                    })}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="m-5 mb-14 font-texts text-center text-slate-500 font-bold">
                  Modif
                </h2>
                <div className="flex flex-col items-center justify-center">
                  {dataMapName.map((e) => {
                    const userRoleId = e.user_id;
                    return (
                      <button
                        type="button"
                        key={userRoleId}
                        onClick={() => {
                          setUser(userRoleId);
                          setPopUp(true);
                        }}
                        className=" h-[25px] mb-5 flex items-center justify-center"
                      >
                        <AiFillEdit className="text-3xl mt-3 text-emerald-700 opacity-70 hover:opacity-100 hover:scale-110 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="">
                <h2 className="m-5 mb-14 font-texts text-slate-500 font-bold">
                  Supprimer
                </h2>
                <div className="flex flex-col items-center">
                  {dataMapName.map((e) => {
                    const userRoleId = e.user_id;
                    return (
                      <button
                        type="button"
                        key={userRoleId}
                        onClick={() => {
                          setPopUpDelete(true);
                          setUser(userRoleId);
                        }}
                        className=""
                      >
                        <BsFillTrash3Fill
                          className="text-2xl mt-2 mb-3 opacity-60 hover:opacity-100  hover:scale-110 transition-all"
                          key={userRoleId}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <NavLink to="/settings">
                <button
                  type="button"
                  className="mt-10 text-emerald-600 font-texts text-base font-bold ml-auto mr-10 px-4 py-2"
                >
                  Fermer
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
