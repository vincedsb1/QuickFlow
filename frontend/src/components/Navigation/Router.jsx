import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import NewIdea from "../../pages/NewIdea";
import EditIdea from "../../pages/EditIdea";
import EmptyDashboard from "../../pages/EmptyDashboard";
import Details from "../../pages/Details";
import Inscription from "../../pages/Inscription";
import Connexion from "../../pages/Connexion";
import LandingPage from "../../pages/LandingPage";
import UserAccount from "../../pages/UserAccount";
import ChooseOrganisation from "../../pages/ChooseOrganisation";
import OrgaSettings from "../../pages/OrgaSettings";
import CreateOrg from "../../pages/CreateOrg";
import DashboardTest from "../../pages/DashboardTest";
import NotFound from "../../pages/page 404/NotFound";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import UserManagement from "../../pages/UserManagement";
import Protected from "./Protected";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />

      <Route
        path="/choose_organisation"
        element={
          <Protected>
            <ChooseOrganisation />
          </Protected>
        }
      />
      <Route
        path="/newidea"
        element={
          <Protected>
            <NewIdea />
          </Protected>
        }
      />
      <Route
        path="/emptydashboard"
        element={
          <Protected>
            <EmptyDashboard />
          </Protected>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />

      <Route
        path="/editidea/:id"
        element={
          <Protected>
            <EditIdea />
          </Protected>
        }
      />

      <Route
        path="/details"
        element={
          <Protected>
            <Details />
          </Protected>
        }
      />
      <Route
        path="/details/:id"
        element={
          <Protected>
            <Details />
          </Protected>
        }
      />
      <Route
        path="/account"
        element={
          <Protected>
            <UserAccount />
          </Protected>
        }
      />
      <Route
        path="/settings"
        element={
          <Protected>
            <OrgaSettings />
          </Protected>
        }
      />
      <Route
        path="/settings/management"
        element={
          <Protected>
            <UserManagement />
          </Protected>
        }
      />
      <Route
        path="/createorg"
        element={
          <Protected>
            <CreateOrg />
          </Protected>
        }
      />
      <Route
        path="/dashboardtest"
        element={
          <Protected>
            <DashboardTest />
          </Protected>
        }
      />
      <Route path="/*" element={<NotFound />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default Router;
