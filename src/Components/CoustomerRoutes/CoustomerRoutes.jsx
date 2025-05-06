import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import ChatPage from "../Pages/ChatPage";
import SignUp from "../LoginSignup/SignUp";
import OTP from "../LoginSignup/OTP";
import SignInPage from "../LoginSignup/SignInPage";
import Header from "../home/Page";

const CoustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Header />} />
      <Route path="/" element={<Header />} />
      <Route path="/chatPage" element={<ChatPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/SignInPage" element={<SignInPage />} />
    </Routes>
  );
};

export default CoustomerRoutes;
