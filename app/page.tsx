"use client";

import { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SocialProof from "./components/SocialProof";
import Contact from "./components/Contact";
import CalendlyModal from "./components/CalendlyModal";

export default function Home() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  return (
    <>
      <Navigation onBookCall={openCalendly} />
      <main>
        <Hero onBookCall={openCalendly} />
        <Services onBookCall={openCalendly} />
        <SocialProof />
        <Contact onBookCall={openCalendly} />
      </main>
      <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendly} />
    </>
  );
}
