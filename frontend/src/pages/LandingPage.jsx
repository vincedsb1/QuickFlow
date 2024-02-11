import React from "react";
import HeroLP from "./sections/HeroLP";
import ProcessLP from "./sections/ProcessLP";
import CtaLP from "./sections/CtaLP";
import "../App.css?inline";

function LandingPage() {
  return (
    <div>
      <HeroLP />
      <ProcessLP />
      <CtaLP />
    </div>
  );
}

export default LandingPage;
