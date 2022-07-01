import React from "react";
import InternalLayout from "../../components/layout/inner";
import "../../styles/Exit.scss";
import Bargraph from "./Bargraph";

function Exit() {
  return (
    <InternalLayout>
      <div className="main">
        <div className="container">
          <h1 className="heading">Exit Statistics</h1>
          <Bargraph />
        </div>
      </div>
    </InternalLayout>
  );
}

export default Exit;
