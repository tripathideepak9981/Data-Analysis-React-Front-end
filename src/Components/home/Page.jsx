import { React, useState } from "react";
import Feature from "./feature";
import About from "./about";
import HeroSection from "./heroSection";
import FaqSection from "./FaqSection";
import WorkProcess from "./WorkProcess";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Header() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const isLoggedIn = () => {
    return !!username;
  };

  return (
    <div className="header px-0 py-0">
      <Navbar
        username={username}
        setUsername={setUsername}
        isLoggedIn={isLoggedIn}
      />
      <HeroSection isLoggedIn={isLoggedIn} />
      <About />
      <WorkProcess />
      <Feature className="mb-4" />
      {/* <FaqSection /> */}
      <Footer />
    </div>
  );
}
