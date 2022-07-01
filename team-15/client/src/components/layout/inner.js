import Navbar from "../common/Navbar";
import "../../styles/inner-layout.scss";
import people from "../../images/employee.png";
import bank from "../../images/department.png";
import goals from "../../images/goals.png";
import training from "../../images/Training.png";
import probation from "../../images/Probation.png";
import application from "../../images/Application.png";
import exit from "../../images/Exit.png";
import growth from "../../images/p_m.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HRLayout({ children }) {
  return (
    <div className="layoutmaincontainer">
      <Navbar />
      <div className="navlinkssection">
        <div className="navlinks">
          <Link to="/employee/details">
            <img src={people} alt="Employee" className="icons" id="people" />
          </Link>
          <Link to="/hr/employees">
            <img className="icons" src={bank} alt="Department" id="bank" />
          </Link>
          <Link to="/hr/training">
            <img className="icons" src={growth} alt="Performance" id="growth" />
          </Link>
          <Link to="/hr/goals">
            <img className="icons" src={goals} alt="Goals" id="goals" />
          </Link>
          <Link to="/employee/applications">
            <img
              className="icons"
              src={application}
              alt="Application"
              id="application"
            />
          </Link>
          <Link to="/hr/employees"></Link>
          <Link to="/employee/probation">
            <img
              className="icons"
              src={probation}
              alt="Probation"
              id="probation"
            />
          </Link>
          <Link to="/hr/training">
            <img
              className="icons"
              src={training}
              alt="Training"
              id="training"
            />
          </Link>
          <Link to="/hr/exit">
            <img className="icons" src={exit} alt="Exit" id="exit" />
          </Link>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
