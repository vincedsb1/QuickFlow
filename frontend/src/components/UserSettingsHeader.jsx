import React, { useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../contexts/UserContext";

function UserSettingsHeader({ userFirstname, userName }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>; // Vous pouvez personnaliser le message de chargement
  }

  return (
    <div
      id="headerSettingsUserContainer"
      className="md:ml-32 ml-6 flex flex-row items-center"
    >
      <div id="headerSettingsUserPhotoContainer" className="min-w-20 w-20">
        <img
          src={user.photoProfil}
          alt="PP"
          className="h-20 w-20 rounded-full object-cover"
        />
      </div>
      <div id="headerSettingsUserInfosContainer" className="ml-8">
        <div id="headerSettingsUserName" />
        <p className="font-texts text-slate-100 text-xl">
          {userFirstname} {userName}
        </p>
      </div>
    </div>
  );
}

UserSettingsHeader.propTypes = {
  userFirstname: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default UserSettingsHeader;
