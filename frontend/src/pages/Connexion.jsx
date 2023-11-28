import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import quickflow from "../assets/logos/logo-quickflow.svg";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Récupération de orgId dans l'url
  const url = new URL(window.location.href);
  const orgId = url.searchParams.get("orgId");

  // fonction qui initie la connexion
  const handleConnexion = (e) => {
    e.preventDefault();

    // route backend de connexion
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email, password })
      .then((res) => {
        // on récupère le token généré en backend et on le stocke dans le localStorage
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.sub);
        return decodedToken.sub.id;
      })
      .then((userId) => {
        // si on a reçu une invtation, il y a un orgId dans l'url. Dans ce cas, on rejoint automatiquement l'organisation en question
        if (orgId) {
          // l'axios ici ajoute l'utilisateur à l'organisation dans la base de données
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/inviteUser`, {
              orgId,
              userId,
            })
            .then(() => {
              return Promise.all([
                axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/user/${userId}/orga/${orgId}/role/2/checkRole/inscription`,
                  { checkRole: 0 }
                ),
                axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/user/${userId}/orga/${orgId}/role/3/checkRole/inscription`,
                  { checkRole: 0 }
                ),
                axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/user/${userId}/orga/${orgId}/role/4/checkRole/inscription`,
                  { checkRole: 0 }
                ),
              ]);
            })
            .catch((err) => console.error(err));
        }
        navigate("/choose_organisation");
      })
      .catch(() => {
        console.error("Login failed");
        setPassword("");
        setError(true);
      });
  };

  return (
    <div
      id="body-connexion"
      className="App bg-slate-100 min-h-screen px-5 pb-8"
    >
      <div id="logo-box" className="flex justify-center pt-6 pb-10">
        <img
          id="logo"
          src={quickflow}
          alt="logo quickflow"
          className="w-44 py-5 max-w-xs"
        />
      </div>
      <div
        id="box-connexion"
        className="bg-white shadow-md rounded-xl p-12 border-solid border border-slate-300 max-w-2xl m-auto"
      >
        <h1 className="font-titles text-3xl font-bold">
          Content de vous revoir
        </h1>
        <br />
        <h2 className="font-texts text-[22px]">
          Connectez-vous et commencez à voter pour des idées
        </h2>
        <br />
        <form onSubmit={handleConnexion} action="">
          <label className="font-texts block" htmlFor="email">
            Votre email
          </label>
          <input
            id="email"
            className="border-solid border border-slate-300 p-2 rounded-md w-full h-10 mt-1"
            type="email"
            autoComplete="email"
            placeholder="exemple : dupond@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="block mt-4">
            Votre mot de passe
          </label>
          <input
            id="password"
            className="border-solid border border-slate-300 p-2 rounded-md w-full h-10 mt-1"
            type="password"
            autoComplete="password"
            placeholder="Entrez un mot de passe"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
          {error && (
            <p className="font-texts font-bold text-red-700">
              Adresse email ou mot de passe incorrect
            </p>
          )}
          <br />
          <br />
          <NavLink to="/forgot-password">
            <p className="forgot-password text-emerald-600 font-texts font-bold">
              Mot de passe oublié ?
            </p>
          </NavLink>
          <br />
          <div className="flex justify-center">
            <button
              id="seconnecter-button"
              type="submit"
              className="px-5 py-1 rounded-full font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-100 w-full h-11"
            >
              Se connecter
            </button>
          </div>
        </form>

        <br />
        <div className="flex justify-center items-center gap-4 opacity-20">
          <div className="bg-current h-0.5 w-1/2" />
          <p className="pb-1">ou</p>
          <div className="bg-current h-0.5 w-1/2" />
        </div>
        <br />
        <span>Vous n'avez pas encore de compte ?</span>
        <NavLink to="/inscription">
          <span className="text-emerald-600 font-texts font-bold pl-3">
            Créer un compte
          </span>
        </NavLink>
      </div>
    </div>
  );
}

export default Connexion;
