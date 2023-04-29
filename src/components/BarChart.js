import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData, options }) => {
  return (
    <>
      <h2 className="graph-head">Bar Graph</h2>
      <Bar data={chartData} />
    </>
  );
};

export default BarChart;
