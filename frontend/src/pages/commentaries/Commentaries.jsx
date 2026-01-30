import axios from "axios";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import redTrash from "../../assets/logos/RedTrash.svg";
import PopUpDeleteComByUser from "../../components/Pop-ups/PopUpDeleteComByUser";
import RoleContext from "../../contexts/RoleContext";

function Commentaries({ comms, setComms, ideeId }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [description, setDescription] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const { roleContext } = useContext(RoleContext);

  // récupération des infos pour le rendu en direct du commentaire
  const userToken = localStorage.getItem("token");
  const user = jwtDecode(userToken).sub;
  const userId = user.id;
  const { nom, prenom, photoProfil } = user;
  const date = Date();
  // fonction qui change le format de la date en JJ/MM/AAAA
  // eslint-disable-next-line no-shadow
  function formatDate(date) {
    return date.split("").slice(0, 10).join("").split("-").reverse().join("/");
  }
  // gère simplement l'affichage de l'input
  const handleWriteComment = () => {
    setIsCommenting(true);
  };

  // Création d'un commentaire
  const handlePostComment = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/idee/${ideeId}/comment`,
        { description, ideeId, userId },
        { headers }
      )
      .then(() => {
        setIsCommenting(false);
        setComms((prevComms) => [
          { date, description, nom, prenom, photoProfil },
          ...prevComms,
        ]);
        setDescription("");
      })
      .catch((err) => console.error("Erreur de post commentaire", err));
  };

  // permet d'afficher les commentaires du plus récent au plus ancien
  const sortedComms = comms.sort((a, b) => new Date(b.date) - new Date(a.date));

  // vérifie si mon utilisateur a les droits de suppression d'un commentaire ou si il est le proprio

  // rendu du composant
  return (
    <div className="w-full bg-white rounded-lg mt-8 mb-8 p-4">
      <p className="text-slate-900 font-titles font-bold text-2xl md:text-3xl leading-[29px] p-8">
        Commentaires
      </p>
      {isCommenting ? (
        <div>
          <label className="font-texts block" htmlFor="commentaire">
            Ajouter un commentaire
          </label>
          <input
            id="commentaire"
            className="input-quickflow"
            placeholder="Ajoutez votre commentaire..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      ) : null}
      <div className="flex justify-end pr-8">
        <button
          type="button"
          onClick={isCommenting ? handlePostComment : handleWriteComment}
          className="px-5 py-1 my-4 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100"
        >
          {isCommenting ? "Publier" : "Commenter"}
        </button>
      </div>

      <div>
        {sortedComms &&
          sortedComms.map((el) => {
            const isOwner = userId === el.user_id;

            const canDelete =
              (roleContext &&
                roleContext.some((e) => {
                  return (
                    (e.role === "admin" ||
                      e.role === "supprimer commentaire") &&
                    e.check_role
                  );
                })) ||
              isOwner;
            return (
              <div key={el.id} className="p-4">
                <div className="bg-slate-300 h-0.5 w-4/5" />
                {canDelete && (
                  <button
                    title="Supprimer"
                    type="button"
                    className="relative left-3/4"
                    onClick={() => {
                      setActiveCommentId(el.id);
                      setPopUp(true);
                    }}
                  >
                    <img
                      className="h-[25px] w-[25px] ml-24 mb-5"
                      src={redTrash}
                      alt="Trash"
                    />
                  </button>
                )}

                <div className="flex items-center gap-4">
                  <div className="rounded-full h-[80px] w-[80px]">
                    <img
                      className="w-full h-full border border-solid border-slate-300 rounded-full object-cover"
                      src={
            el.photoProfil.startsWith("http")
              ? el.photoProfil
              : `${import.meta.env.VITE_BACKEND_URL}${el.photoProfil}`
          }
                      alt=""
                    />
                  </div>
                  <div>
                    <p>
                      {el.prenom} {el.nom}
                    </p>
                    <p>{formatDate(el.date)}</p>
                  </div>
                </div>
                <br />
                <p className="w-3/4 break-words">{el.description}</p>
              </div>
            );
          })}{" "}
        <div>
          {popUp && (
            <div>
              <PopUpDeleteComByUser
                setPopUp={setPopUp}
                idCom={activeCommentId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Commentaries.propTypes = {
  comms: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  setComms: PropTypes.func.isRequired,
  ideeId: PropTypes.number.isRequired,
};

export default Commentaries;
