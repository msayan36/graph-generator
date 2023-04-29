import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  return (
    <>
      <h2 className="graph-head">Line Graph</h2> <Line data={chartData} />{" "}
    </>
  );
};

export default LineChart;
