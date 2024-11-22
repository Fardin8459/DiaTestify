// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import Home from "./Components/Home/Home";
import Title from "./Components/Title/Title";
import Footer from "./Components/Footer/Footer";
import BackgroundImageComponent from "./Components/Background/Background";
import Register from "./Components/SignUp/SignUp";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import FloatingIcons from "./Components/FloatingIcons.jsx/FloatingIcons";
// import {Logout} from "./Components/Logout/Logout"

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          index
          element={
            <>
              <BackgroundImageComponent />
              <Title
                subTitle="Predict the probability of having Diabetes"
                title="Diabetes Prediction"
              />
              <Home />
              <FloatingIcons />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About />
              <FloatingIcons />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Title subTitle="Contact Us" title="Get in Touch" />
              <Contact />
              <FloatingIcons />
            </>
          }
        />
        <Route path="/signUp" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
