import { Chart } from "react-google-charts";
import React from "react";

function Bargraph() {
  const data = [
    ["City", "2021 Population", "2022 Population"],
    ["Low Salary", 8175, 8008],
    ["Transportation Issues", 3792, 3694],
    ["Family Problems", 2695, 2896],
    ["Less growth", 2099, 1953],
  ];
  const options = {
    title: "Reasons for Leaving Company",
    chartArea: { width: "50%" },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
      title: "Number of employees",
      minValue: 0,
    },
    vAxis: {
      title: "Issues",
    },
  };
  return (
    <Chart
      chartType="BarChart"
      data={data}
      width="100%"
      height="400px"
      options={options}
      legendToggle
    />
  );
}
export default Bargraph;
