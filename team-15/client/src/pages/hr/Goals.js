import React from "react";
import InternalLayout from "../../components/layout/inner";
import "../../styles/goals.scss";
function Goals() {
  return (
    <InternalLayout>
      <div className="main-div">
        <div className="container">
          <h1 className="heading">Goals</h1>
          <div className="text-data">500</div>
        </div>
      </div>
    </InternalLayout>
  );
}

export default Goals;
