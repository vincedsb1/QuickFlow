import "./services/index.css";
import { useState, useMemo, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Router from "./components/Navigation/Router";
import UserContext from "./contexts/UserContext";
import OrgaContext from "./contexts/OrgaContext";
import RoleContext from "./contexts/RoleContext";

function App() {
  const initialUser = () => JSON.parse(localStorage.getItem("user")) || null;
  const initialOrgaContext = () =>
    JSON.parse(localStorage.getItem("orgaContext")) || null;
  const initialRoleContext = () =>
    JSON.parse(localStorage.getItem("roleContext")) || null;

  const [user, setUser] = useState(initialUser);
  const [orgaContext, setOrgaContext] = useState(initialOrgaContext);
  const [roleContext, setRoleContext] = useState(initialRoleContext);

  useEffect(() => {
    const getContextByToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setUser(jwtDecode(token).sub);
        }
      } catch {
        console.error("Erreur");
      }
    };
    getContextByToken();
  }, []);

  // Ajout de useEffect ici
  useEffect(() => {
    localStorage.setItem("roleContext", JSON.stringify(roleContext));
  }, [roleContext]);

  const userValue = useMemo(() => {
    return { user, setUser };
  }, [user, setUser]);

  const orgaValue = useMemo(() => {
    return { orgaContext, setOrgaContext };
  }, [orgaContext]);

  const roleValue = useMemo(() => {
    return { roleContext, setRoleContext };
  }, [roleContext]);

  return (
    <UserContext.Provider value={userValue}>
      <div className="App">
        <OrgaContext.Provider value={orgaValue}>
          <RoleContext.Provider value={roleValue}>
            <Router />
          </RoleContext.Provider>
        </OrgaContext.Provider>
      </div>
    </UserContext.Provider>
  );
}

export default App;
