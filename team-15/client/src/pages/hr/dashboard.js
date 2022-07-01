import React from "react";
import "../../styles/hr-landing.scss";
import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { TbBuilding } from "react-icons/tb";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { TbFileSpreadsheet } from "react-icons/tb";
import { MdPersonSearch } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";
import { BiExit } from "react-icons/bi";

export default function HRDashboard() {
  return (
    <div className="maincontainerlanding">
      <Navbar />
      <div className="main">
        <Link to="/hr/employees">
          <div className="card">
            <TiGroup size={70} color="white" />
            <span>Employees</span>
          </div>
        </Link>
        <Link to="/hr/roles">
          <div className="card">
            <TbBuilding size={70} color="white" />
            <span>Roles</span>
          </div>
        </Link>
        <Link to="/hr/applications">
          <div className="card">
            <TbFileSpreadsheet size={70} color="white" />
            <span>Applicants</span>
          </div>
        </Link>
        <Link to="/employee/probation">
          <div className="card">
            <MdPersonSearch size={70} color="white" />
            <span>Probation</span>
          </div>
        </Link>
        <Link to="/hr/training">
          <div className="card">
            <SiTrainerroad size={70} color="white" />
            <span>Training</span>
          </div>
        </Link>
        <Link to="/hr/exit">
          <div className="card">
            <BiExit size={70} color="white" />
            <span>Exit Formalities</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
