import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import { data } from "autoprefixer";
import Header from "../components/Header";
import SettingsHeader from "../components/SettingsHeader";
import ActionButtons from "../components/ActionButtons/ActionButtons";
import UserContext from "../contexts/UserContext";
import EditPhotoUser from "../components/EditPhotoUser";

function UserAccount() {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userFirstname, setUserFirstname] = useState("");
  const [userMail, setUserMail] = useState("");
  const [photo, setPhoto] = useState(user && user.photoProfil);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`)
          .then((response) => {
            const userData = response.data;
            setUserName(userData?.[0]?.nom);
            setUserFirstname(userData?.[0]?.prenom);
            setUserMail(userData?.[0]?.email);
          });
      } catch {
        console.error("erreur");
      }
    };

    fetchUser();
  }, [user]);

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`,
        {
          nom: userName,
          prenom: userFirstname,
          email: userMail,
          photo,
        },
        { headers }
      )
      .then(() => {
        // Refresh user data
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`)
          .then((response) => {
            const userData = response.data;
            setUserName(userData?.[0]?.nom);
            setUserFirstname(userData?.[0]?.prenom);
            setUserMail(userData?.[0]?.email);
            setEditMode(false);
            const userId = user.id;
            const modifiedUser = {
              id: userId,
              nom: userName,
              preno: userFirstname,
              email: userMail,
              photoProfil: photo,
            };
            setUser(modifiedUser);
          });
      });
  };

  return (
    <div className="App min-h-screen bg-slate-100 flex flex-col items-center">
      <div id="header" className="w-full">
        <Header />
      </div>
      <div id="SettingsHeader" className="w-full">
        <SettingsHeader userFirstname={userFirstname} userName={userName} />
      </div>
      <div
        id="SettingsContainer"
        className="flex-grow max-w-7xl w-full xl:w-[1280px] flex flex-col items-center"
      >
        <div
          id="SettingsCard"
          className="md:max-w-5/6 bg-white md:m-16 rounded-2xl md:w-5/6 flex flex-col flex-grow w-full"
        >
          <div
            id="SettingsContentGlobal"
            className="flex flex-row flex-grow justify-between"
          >
            <div
              id="SettingsContentText"
              className="flex flex-col w-2/3 mx-24 my-16"
            >
              {/* style en mode edition */}
              {editMode ? (
                <>
                  <div
                    id="SettingsNameContainer"
                    className="flex flex-col mb-4"
                  >
                    <div
                      id="SettingsNameLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Nom
                    </div>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={user && userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div
                    id="SettingsFirstnameContainer"
                    className="flex flex-col mb-4"
                  >
                    <div
                      id="SettingsFirstnameLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Prénom
                    </div>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={user && userFirstname}
                      onChange={(e) => setUserFirstname(e.target.value)}
                    />
                  </div>
                  <div
                    id="SettingsEmailContainer"
                    className="flex flex-col mb-4"
                  >
                    <div
                      id="SettingsEmailLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Email
                    </div>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-bold text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={user && userMail}
                      onChange={(e) => setUserMail(e.target.value)}
                    />
                  </div>
                  <div
                    id="SettingsPasswordContainer"
                    className="flex flex-col mb-6"
                  >
                    <div
                      id="SettingsPassLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Mot de passe
                    </div>
                    <div
                      id="SettingsFirstname"
                      className="font-texts text-slate-800 font-bold text-xl "
                    >
                      ••••••••
                      {/* {userPass} */}
                    </div>
                  </div>
                </>
              ) : (
                // style en mode consultation

                <>
                  <div
                    id="SettingsNameContainer"
                    className="flex flex-col mb-9"
                  >
                    <div
                      id="SettingsNameLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Nom
                    </div>
                    <div
                      id="SettingsName"
                      className="font-texts text-slate-800 font-bold text-xl "
                    >
                      {user && userName}
                    </div>
                  </div>
                  <div
                    id="SettingsFirstnameContainer"
                    className="flex flex-col mb-9"
                  >
                    <div
                      id="SettingsFirstnameLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Prénom
                    </div>
                    <div
                      id="SettingsFirstname"
                      className="font-texts text-slate-800 font-bold text-xl "
                    >
                      {user && userFirstname}
                    </div>
                  </div>
                  <div
                    id="SettingsEmailContainer"
                    className="flex flex-col mb-9"
                  >
                    <div
                      id="SettingsEmailLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Email
                    </div>
                    <div
                      id="SettingsFirstname"
                      className="font-texts text-slate-800 font-bold text-xl "
                    >
                      {user && userMail}
                    </div>
                  </div>
                  <div
                    id="SettingsPasswordContainer"
                    className="flex flex-col mb-6"
                  >
                    <div
                      id="SettingsPassLabel"
                      className="font-texts text-base text-slate-500 "
                    >
                      Mot de passe
                    </div>
                    <div
                      id="SettingsFirstname"
                      className="font-texts text-slate-800 font-bold text-xl "
                    >
                      ••••••••
                      {/* {userPass} */}
                    </div>
                  </div>
                </>
              )}
              <NavLink to="/">
                <div
                  id="SettingsDeleteAccount"
                  className="font-texts text-base text-sky-600 font-bold mt-12"
                >
                  Supprimer mon compte
                </div>
              </NavLink>
            </div>
            <div className="hidden xl:block  flex items-center justify-center">
              <div className=" flex items-center justify-center h-full">
                <EditPhotoUser
                  editMode={editMode}
                  photo={photo && photo}
                  setPhoto={setPhoto}
                />
              </div>
            </div>
          </div>
          <div
            id="SettingsButtonContainer"
            className="h-24 flex items-center justify-center h-fit mb-6"
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

export default UserAccount;
