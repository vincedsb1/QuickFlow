import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function DashboardTest() {
  return (
    <div className="App h-fit min-h-screen bg-slate-100">
      <div id="header">
        <Header />
      </div>
      <div id="navbar">
        <Navbar />
      </div>
    </div>
  );
}
//
export default DashboardTest;
