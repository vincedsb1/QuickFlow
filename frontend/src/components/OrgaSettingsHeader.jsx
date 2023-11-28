import React from "react";
import PropTypes from "prop-types";

function OrgaSettingsHeader({ orgaName, data }) {
  return (
    <div
      id="headerSettingsOrgaContainer"
      className="md:ml-32 ml-4 flex flex-row items-center"
    >
      <div
        id="headerSettingsOrgaPhotoContainer"
        className="w-36 sm:w-24 h-24 bg-white rounded-full flex items-center justify-center"
      >
        <img src={data} className="max-h-20 max-w-20  h-20 p-4" alt="data" />
      </div>
      <div id="headerSettingsOrgaInfosContainer" className="ml-8">
        <div id="headerSettingsOrgaName" />
        <p className="font-texts text-slate-100 text-xl">{orgaName}</p>
        <div
          id="headerSettingsOrgaSeniorityContainer"
          className="flex items-center justify-center"
        />
      </div>
    </div>
  );
}

OrgaSettingsHeader.propTypes = {
  orgaName: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default OrgaSettingsHeader;
