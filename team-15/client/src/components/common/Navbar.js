import React from "react";
import "../../styles/navbar.scss";
import image from "../../images/logo.svg";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="maincontainernavbar">
      <Link to="/hr/dashboard">
        <img src={image} alt="" width={140} height={90} />
      </Link>
    </div>
  );
}
