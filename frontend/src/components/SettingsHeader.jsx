import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import UserSettingsHeader from "./UserSettingsHeader";
import OrgaSettingsHeader from "./OrgaSettingsHeader";

function SettingsHeader({ userFirstname, userName, orgaName, data }) {
  const location = useLocation();

  return (
    <div
      id="dashboard-bar"
      className="h-36 flex items-center justify-center px-4 max-w-8xl bg-emerald-600"
    >
      <div
        id="headerMenuContainer"
        className="flex flex-row items-center justify-between w-full lg:w-[1280px]"
      >
        {location.pathname === "/account" ? (
          <>
            <UserSettingsHeader
              userFirstname={userFirstname}
              userName={userName}
            />
            <div id="headerSettingsPageNameContainer">
              <p className="text-slate-100 font-texts text-xl mr-6">
                Mon compte
              </p>
            </div>
          </>
        ) : (
          <>
            <OrgaSettingsHeader orgaName={orgaName} data={data} />
            <div id="headerSettingsPageNameContainer">
              <p className="text-slate-100 font-texts text-xl mr-6">
                Paramètres
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

SettingsHeader.propTypes = {
  userFirstname: PropTypes.string,
  userName: PropTypes.string,
  orgaName: PropTypes.string,
  data: PropTypes.string,
};

SettingsHeader.defaultProps = {
  userFirstname: "",
  userName: "",
  orgaName: "",
  data: "",
};

export default SettingsHeader;
