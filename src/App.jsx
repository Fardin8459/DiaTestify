// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Home from "./Components/Home/Home";
import Title from "./Components/Title/Title";
import BackgroundImageComponent from "./Components/Background/Background";
import Register from "./Components/SignUp/SignUp";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import NormalRanges from "./Components/NormalRanges/NormalRanges";
import ChartDisplay, { CorrelationHeatmap } from "./Components/ChartDisplay/ChartDisplay";
import AppLayout from "./Components/layout/AppLayout";
import YogaAsan from "./Components/Prescription/YogaAsan";
// import {Logout} from "./Components/Logout/Logout"

const App = () => {
  return (
      <Routes>
        {/* Shared Layout for Routes */}
        <Route path="/" element={<AppLayout />}>
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
              </>
            }
          />
          <Route
            path="about"
            element={<About />}
          />
          <Route
            path="NormalRanges"
            element={
              <>
                <Title title="Normal Ranges for Attributes" />
                <NormalRanges />
              </>
            }
          />
          <Route
            path="Prescription"
            element={
              <>
                <YogaAsan />
              </>
            }
          />
          <Route
            path="ChartDisplay"
            element={
              <>
                <ChartDisplay />
                <CorrelationHeatmap />
              </>
            }
          />
          <Route
            path="contact"
            element={
              <>
                <Title subTitle="Contact Us" title="Get in Touch" />
                <Contact />
              </>
            }
          />
              <Route path="signUp" element={<Register />} />
              <Route path="login" element={<Login />} />
        </Route>
      </Routes>
  );
};

export default App;
