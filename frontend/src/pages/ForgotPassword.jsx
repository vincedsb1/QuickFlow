import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { NavLink } from "react-router-dom";
import axios from "axios";
import quickflow from "../assets/logos/logo-quickflow.svg";
import PopUpEmailSent from "../components/Pop-ups/PopUpEmailSent";

function PasswordRecoveryBox() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = () => {
    if (email && token) {
      emailjs
        .send(
          "service_3uqi2yp",
          "template_qrwc557",
          { email, token },
          "vJBUGRYLjva59Ktic"
        )
        .then((result) => {
          setEmailSent(true);
          console.warn("Mail success : ", result.text);
        })
        .catch((err) => console.error("Mail error :", err));
    }
  };

  useEffect(() => {
    sendEmail();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/forgotpassword`,
        { email }
      );
      const getToken = response.data.token;
      setToken(getToken);
      sendEmail();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="body-connexion" className="App bg-slate-100 h-screen">
      {emailSent && <PopUpEmailSent />}
      <div id="logo-box" className="flex justify-center pt-6 pb-10">
        <img
          id="logo"
          src={quickflow}
          alt="logo quickflow"
          className="w-44 max-w-xs py-5"
        />
      </div>
      <div
        id="box-connexion"
        className="bg-white shadow-md rounded-xl p-12 mb-6 border-solid border border-slate-300 max-w-2xl mx-auto"
        style={{ width: "80%", marginTop: "2rem" }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Récupérez votre mot de passe
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-6">
            <label htmlFor="email" className="block">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              className="input-quickflow"
              placeholder="exemple : dupond@mail.com"
              required
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="hidden"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col justify-center gap-1 pt-2">
            <div>
              <button
                type="submit"
                className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100 w-full h-11"
              >
                Réinitialiser le mot de passe
              </button>
            </div>
            <div className="flex justify-center pt-4">
              <NavLink to="/login">
                <button
                  type="button"
                  className="text-emerald-600 font-texts font-bold pl-3"
                >
                  Annuler
                </button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecoveryBox;
