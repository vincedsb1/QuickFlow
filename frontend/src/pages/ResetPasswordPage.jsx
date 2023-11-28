import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import quickflow from "../assets/logos/logo-quickflow.svg";
import PopUpChangePassword from "../components/Pop-ups/PopUpChangePassword";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [passwordIsModified, setPasswordIsModified] = useState(false);

  useEffect(() => {
    // On récupère le token stocké dans l'url du lien pour récupérer l'adresse mail de l'utilisateur
    const token = new URL(window.location.href);
    const getToken = token.searchParams.get("token");
    // puis on le décode pour récupérer l'email dans le state email
    if (getToken) {
      setEmail(jwtDecode(getToken).userMail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique de récupération du mot de passe ici
    if (newPassword === confirmPassword) {
      const motDePasse = newPassword;
      // Effectuer l'action de réinitialisation du mot de passe
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/forgotpassword`,
          { email, motDePasse },
          { headers }
        )
        .then(() => {
          setPasswordIsModified(true);
          setPopUp(true);
        })
        .catch((err) => console.error(err));
    } else {
      // Afficher une erreur de correspondance des mots de passe
      setPopUp(true);
    }
  };

  return (
    <div id="body-connexion" className="App bg-slate-100 h-screen px-5">
      {popUp && (
        <PopUpChangePassword
          setPopUp={setPopUp}
          passwordIsModified={passwordIsModified}
          setPasswordIsModified={setPasswordIsModified}
        />
      )}
      <div id="logo-box" className="flex justify-center">
        <img
          id="logo"
          src={quickflow}
          alt="logo quickflow"
          className="w-2/5 py-5 max-w-xs"
        />
      </div>
      <div
        id="box-connexion"
        className="bg-white shadow-md rounded-md p-6 mb-6 border-solid border border-slate-300 max-w-2xl mx-auto"
        style={{ width: "80%", marginTop: "2rem" }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Réinitialiser le mot de passe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-slate-700"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="Entrez votre nouveau mot de passe"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700"
            >
              Confirmez le nouveau mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring focus:ring-emerald-400"
              placeholder="Confirmez votre nouveau mot de passe"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-1">
            <button
              type="submit"
              className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
