import { React, useState } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { LiveDemoSection } from "./LiveDemoSection";
import { KeyFeaturesSection } from "./KeyFeaturesSection";
import Testimonials from "./Testimonials";
import { FAQSection } from "./FAQSection";
import { FooterSection } from "./FooterSection";

export default function Header() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const isLoggedIn = () => {
    return !!username;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        username={username}
        setUsername={setUsername}
        isLoggedIn={isLoggedIn}
      />
      <HeroSection isLoggedIn={isLoggedIn} />
      <HowItWorksSection />
      <LiveDemoSection />
      <KeyFeaturesSection />
      <FAQSection />

      <Testimonials />

      <FooterSection />
    </div>
  );
}
