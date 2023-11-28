import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import NavbarOrga from "../components/Navbarorga";
import UserContext from "../contexts/UserContext";
import PopUpDeleteOrga from "../components/Pop-ups/PopUpDeleteOrga";
import CardOrga from "../components/CardOrga";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ChooseOrganisation() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [dataOrga, setDataOrga] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const [orgaId, setorgaId] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/user/${user && user.id}`)
          .then((res) => setUser(res.data[0]));
      } catch {
        console.error("Error getting user");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/user/${user.id}/orga/focus`, {
          headers,
        })
        .then((res) => {
          setDataOrga(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  // --------------

  const dataMap = [];
  const dataTemporaire = [];
  dataOrga.forEach((el) => {
    if (!dataTemporaire.includes(el.id)) {
      dataTemporaire.push(el.id);
      dataMap.push(el);
    }
  });

  // -----------------

  const handleOrgaDeleted = (id) => {
    setDataOrga(dataOrga.filter((orga) => orga.id !== id));
  };

  // -----------------

  return (
    <div>
      <NavbarOrga />
      {popUp ? (
        <PopUpDeleteOrga
          onOrgaDeleted={handleOrgaDeleted}
          user={user}
          setPopUp={setPopUp}
          orgaId={orgaId}
        />
      ) : (
        ""
      )}
      <div className="App h-screen bg-slate-100 p-5">
        {dataMap.length === 0 ? (
          ""
        ) : (
          <div className="bg-white p-6 shadow-lg mt-5 border-solid border border-slate-300 max-w-5xl m-auto rounded-xl mt-4">
            <div className="text-center mt-4">
              <h1 className="font-titles text-slate-900 font-bold text-3xl">
                Rejoindre une organisation existante
              </h1>
            </div>
            <br />

            <div>
              <p className="font-texts text-slate-900 text-[22px] text-center">
                Vous faites déjà partie de ces organisations, voulez-vous y
                accéder ?
              </p>
            </div>
            <br />

            {dataMap.length !== 1 ? (
              <Slider {...settings}>
                {dataMap.map((el) => {
                  return (
                    <CardOrga
                      key={el.id}
                      id={el.id}
                      name={el.nom_organisation}
                      logo={el.logo}
                      setPopUp={setPopUp}
                      setorgaId={setorgaId}
                    />
                  );
                })}
              </Slider>
            ) : (
              <div>
                {dataMap.map((el) => {
                  return (
                    <CardOrga
                      key={el.id}
                      id={el.id}
                      name={el.nom_organisation}
                      logo={el.logo}
                      setPopUp={setPopUp}
                      setorgaId={setorgaId}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div className="bg-white p-5 shadow-lg mt-6 border-solid border border-slate-300 text-center flex-col max-w-5xl m-auto rounded-xl">
          <div>
            <h1 className="font-titles text-slate-900 font-bold text-3xl mt-4">
              Créer un nouvelle organisation
            </h1>
          </div>
          <br />
          <div>
            <p className="font-texts text-slate-900 text-[22px] pb-4">
              Créez une organisation et permettez à vos utilisateurs de
              soumettre des idées
            </p>
          </div>
          <div>
            <NavLink to="/createorg">
              <button
                type="submit"
                value="Créer un compte"
                className=" w-[200px] h-[43px] font-texts text-[22px] rounded-full text-emerald-500 border-solid border-2 border-emerald-500 md:w-[254px] mb-4"
              >
                Créer
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseOrganisation;
