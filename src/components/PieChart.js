import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  return (
    <>
      <h2 className="graph-head">Pie Chart</h2>
      <Pie data={chartData} />
    </>
  );
};

export default PieChart;
