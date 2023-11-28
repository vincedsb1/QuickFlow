import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function PopUpManagemntUser({ dataRole, user, setPopUp, orgaContext }) {
  const [suprComm, setSuprCom] = useState(() => {
    const userRole = dataRole.find(
      (el) => el.role.includes("supprimer commentaire") && el.user_id === user
    );
    return userRole ? userRole.check_role : false;
  });
  const [suprIdee, setSuprIdee] = useState(() => {
    const userRole = dataRole.find(
      (el) => el.role.includes("supprimer idée") && el.user_id === user
    );
    return userRole ? userRole.check_role : false;
  });
  const [decisionnaire, setDecisionnaire] = useState(() => {
    const userRole = dataRole.find(
      (el) => el.role.includes("décisionnaire") && el.user_id === user
    );
    return userRole ? userRole.check_role : false;
  });
  const [admin, setAdmin] = useState(() => {
    const userRole = dataRole.find(
      (el) => el.role.includes("admin") && el.user_id === user
    );
    return userRole ? userRole.check_role : false;
  });

  const handleSubmit = async (modife) => {
    modife.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${user}/orga/${orgaContext}/role/1/checkRole`,
        { checkRole: admin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${user}/orga/${orgaContext}/role/2/checkRole`,
        { checkRole: decisionnaire },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${user}/orga/${orgaContext}/role/3/checkRole`,
        { checkRole: suprIdee },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${user}/orga/${orgaContext}/role/4/checkRole`,
        { checkRole: suprComm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.info("All requests are done");
      setPopUp(false);
    } catch (error) {
      console.error("Error in one or more requests", error);
    }
  };

  return (
    <div className="flex absolute z-50 h-full w-full bg-slate-300 bg-opacity-80 ">
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-200 border border-solid w-auto bg-white border-slate-300 p-5 m-5 rounded-lg  ">
        <p className=" mt-5 font-texts text-[22px] text-center ">
          Gestion de rôle de l'utilisateur
        </p>
        <br />
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-10 m-5">
            <div className="flex flex-col justify-center m-5">
              <h2 className="m-8 font-texts text-slate-500 font-bold">
                Supprimer commentaire
              </h2>
              {dataRole
                .filter((el) => {
                  return el.role.includes("supprimer commentaire");
                })
                .filter((ev) => {
                  return ev.user_id === user;
                })
                .map(() => {
                  return (
                    <input
                      className="checkBox_role"
                      type="checkbox"
                      checked={suprComm}
                      onChange={(e) => {
                        setSuprCom(e.target.checked);
                      }}
                    />
                  );
                })}
            </div>

            <div className="flex flex-col justify-center m-5">
              <h2 className="m-8 font-texts text-slate-500 font-bold">
                Supprimer idée
              </h2>
              {dataRole
                .filter((el) => {
                  return el.role.includes("supprimer idée");
                })
                .filter((ev) => {
                  return ev.user_id === user;
                })
                .map(() => {
                  return (
                    <input
                      className="checkBox_role"
                      type="checkbox"
                      checked={suprIdee}
                      onChange={(e) => {
                        setSuprIdee(e.target.checked);
                      }}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col justify-center m-5">
              <h2 className="m-8 font-texts text-slate-500 font-bold">
                Décisionnaire
              </h2>
              {dataRole
                .filter((el) => {
                  return el.role.includes("décisionnaire");
                })
                .filter((ev) => {
                  return ev.user_id === user;
                })
                .map(() => {
                  return (
                    <input
                      className="checkBox_role"
                      type="checkbox"
                      checked={decisionnaire}
                      onChange={(e) => {
                        setDecisionnaire(e.target.checked);
                      }}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col justify-center m-5">
              <h2 className="m-8 font-texts text-slate-500 font-bold">
                Administrateur
              </h2>
              {dataRole
                .filter((el) => {
                  return el.role.includes("admin");
                })
                .filter((ev) => {
                  return ev.user_id === user;
                })
                .map(() => {
                  return (
                    <input
                      className="checkBox_role"
                      type="checkbox"
                      checked={admin}
                      onChange={(e) => {
                        setAdmin(e.target.checked);
                      }}
                    />
                  );
                })}
            </div>
          </div>
          <div className="w-full flex justify-center mb-10 gap-10">
            <button
              type="submit"
              className="mt-10 w-[150px] h-[43px] font-texts text-[22px] rounded-full font-texts text-white bg-gradient-to-r from-emerald-600 to-emerald-400 md:w-[200px]"
            >
              Valider
            </button>
            <button
              type="button"
              onClick={() => {
                setPopUp(false);
              }}
              className=" mt-10 w-[150px] h-[43px] font-texts text-[22px] rounded-full text-emerald-500  md:w-[200px]"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

PopUpManagemntUser.propTypes = {
  setPopUp: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  dataRole: PropTypes.func.isRequired,
  orgaContext: PropTypes.number.isRequired,
};

export default PopUpManagemntUser;
