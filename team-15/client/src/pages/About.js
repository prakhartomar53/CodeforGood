import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import "../styles/about.scss";

export default function About() {
  return (
    <div className="maincontainerabout">
      <Navbar />
      <div className="main">
        <h1 className="text">About Us</h1>
        <p className="textsmall">
          Kotak Education Foundation (KEF) was set up in 2007 with the intention
          of supporting children and youth from underprivileged families through
          different education-based interventions and skill-training programs.
        </p>
        <div className="img">
          <img
            src="/assets/Education.png"
            alt="About"
            marginLeft="500"
            height="300"
            width="300"
          />
        </div>
        <Link to="/hr/login">
          <button className="button">Log In(HR)</button>
        </Link>
        <Link to="/employee/login">
          <button className="button">Log In(EMployee)</button>
        </Link>
      </div>
    </div>
  );
}
