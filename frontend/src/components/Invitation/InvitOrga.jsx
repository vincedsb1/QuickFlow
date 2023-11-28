import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import axios from "axios";
import PopUpInvitation from "../Pop-ups/PopUpInvitation";

function InvitOrga({ orgId, orgaName }) {
  const [users, setUsers] = useState([]);
  const [org, setOrg] = useState([]);
  const [email, setEmail] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");

  const fetchUsersAndOrg = async () => {
    try {
      const usersResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user`
      );
      setUsers(usersResponse.data);

      const orgResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/orga/${orgId}`
      );
      setOrg(orgResponse.data);
    } catch (error) {
      console.error("Failed to fetch users and org : ", error);
    }
  };

  // récupération des infos utilisateurs
  useEffect(() => {
    fetchUsersAndOrg();
  }, [email]);

  // filtre si l'utilisateur est déja dans la base de données
  const filterUsers = (arr) => {
    return arr.filter((el) => {
      return el.email === email;
    });
  };

  // filter si l'utilisateur fait déja partie de cette organisation
  const filterUsersInThisOrg = (arr) => {
    return arr.filter((el) => {
      return el.email === email;
    });
  };

  // fonction de l'envoi de l'email
  const handleSendEmail = (e) => {
    e.preventDefault();
    // si email et orgId ont une valeur
    if (email && orgId) {
      if (org.length === 0) {
        console.info("données non chargées");
        return;
      }
      const filterdedUsers = filterUsers(users);
      // On vérifie si l'utilisateur est déja inscrit sur le site ou non
      if (filterdedUsers.length === 0) {
        // Il n'est pas inscrit sur le site, on envoie un mail reliant à la page d'inscription
        setPopUp(true);
        setPopUpContent("Email envoyé");
        const page = "inscription";

        emailjs
          .send(
            "service_3uqi2yp",
            "template_jx5x7wk",
            { email, orgId, orgaName, page },
            "vJBUGRYLjva59Ktic"
          )

          .then((result) => {
            console.warn("Mail success : ", result.text);
          })
          .catch((err) => {
            console.error("Mail error :", err);
          });
      } else {
        // s'il est déja inscrit, on vérifie s'il fait partie de l'organisation
        const filteredUsersInThisOrg = filterUsersInThisOrg(org);
        if (filteredUsersInThisOrg.length === 0) {
          // Il ne fait pas partie de l'organisation, on envoie un mail reliant à la page de connexion
          const page = "login";
          setPopUp(true);
          setPopUpContent("Email envoyé");
          emailjs
            .send(
              "service_3uqi2yp",
              "template_jx5x7wk",
              { email, orgId, orgaName, page },
              "vJBUGRYLjva59Ktic"
            )

            .then((result) => {
              console.warn("Mail success : ", result.text);
            })
            .catch((err) => {
              console.error("Mail error :", err);
            });
        }
        // Il fait déja partie de l'organisation, Pop-up "déja inscrit"
        setPopUp(true);
        setPopUpContent(`Cette personne fait déjà partie de ${orgaName}`);
      }
    }
  };

  return (
    <div>
      {popUp && (
        <PopUpInvitation popUpContent={popUpContent} setPopUp={setPopUp} />
      )}
      <label htmlFor="email" className="font-texts text-base text-slate-500">
        Envoyer une invitation
      </label>
      <input
        id="email"
        className="input-quickflow mt-2"
        type="email"
        placeholder="example@gmail.com"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="button"
        onClick={handleSendEmail}
        className="font-texts text-base text-sky-600 font-bold pt-2"
      >
        Envoyer
      </button>
    </div>
  );
}

InvitOrga.defaultProps = {
  orgaName: "",
};

InvitOrga.propTypes = {
  orgId: PropTypes.number.isRequired,
  orgaName: PropTypes.string,
};

export default InvitOrga;
