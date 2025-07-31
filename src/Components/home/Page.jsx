import { React, useState } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { LiveDemoSection } from "./LiveDemoSection";
import { KeyFeaturesSection } from "./KeyFeaturesSection";
import Testimonials from "./Testimonials";
import { FAQSection } from "./FAQSection";
import { FooterSection } from "./FooterSection";
import ModernContactSection from "./MorderContactSection";
import { WhyWeStandOutSection } from "./WhyWeStandOutSection";

export default function Header() {
  const [username, setUsername] = useState(() => {
    const email = sessionStorage.getItem("username");
    return email?.match(/^[a-zA-Z]+/g)?.[0] || "";
  });

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
      <WhyWeStandOutSection />
      <HowItWorksSection />
      <LiveDemoSection />
      <KeyFeaturesSection />
      <FAQSection />
      {/* 
      <Testimonials /> */}
      <ModernContactSection />

      <FooterSection />
    </div>
  );
}
