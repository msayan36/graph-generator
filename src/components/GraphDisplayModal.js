import React, { useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { FaTimes } from "react-icons/fa";

const GraphDisplayModal = ({
  openGraphDisplayModal,
  setOpenGraphDisplayModal,
  codeRes,
  codeErr,
}) => {
  console.log(codeRes, codeErr);

  const [selectBarTab, setSelectBarTab] = useState(true);
  const [selectLineTab, setSelectLineTab] = useState(false);
  const [selectPieTab, setSelectPieTab] = useState(false);

  const data = codeRes && codeRes.split(" ");
  // console.log(data);
  // console.log(data.slice(1, Number(data[0]) + 1));
  // console.log(
  //   data.slice(Number(data[0]) + 3, Number(data[0]) + Number(data[0]) + 3)
  // );
  // console.log(data[Number(data[0]) + 2]);

  const graphData = {
    labels: data && data.slice(1, Number(data[0]) + 1),
    datasets: [
      {
        label: data && data[Number(data[0]) + 2],
        data:
          data &&
          data.slice(
            Number(data[0]) + 3,
            Number(data[0]) + Number(data[0]) + 3
          ),
        backgroundColor:
          data &&
          data.map(
            (data, id) =>
              `#33${id < 10 ? id + 2 : "c"}${id < 10 ? id + 5 : "c"}${
                id < 4 ? id + 3 : "c"
              }${id < 10 ? id + 6 : "c"}`
          ),
        borderColor: "#4aed88",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div
      className={`parent_modal ${
        openGraphDisplayModal ? "modal-open" : "modal-close"
      }`}
    >
      <div className="modal-graph">
        <div className="tabs">
          <p
            className={`tab-g ${selectBarTab && "tab-select"}`}
            onClick={() => {
              setSelectBarTab(true);
              setSelectLineTab(false);
              setSelectPieTab(false);
            }}
          >
            Bar
          </p>
          <p
            className={`tab-g ${selectLineTab && "tab-select"}`}
            onClick={() => {
              setSelectBarTab(false);
              setSelectLineTab(true);
              setSelectPieTab(false);
            }}
          >
            Line
          </p>
          <p
            className={`tab-g ${selectPieTab && "tab-select"}`}
            onClick={() => {
              setSelectBarTab(false);
              setSelectLineTab(false);
              setSelectPieTab(true);
            }}
          >
            Pie
          </p>
        </div>
        {selectBarTab ? (
          <div className="chart-div">
            <BarChart chartData={graphData} />
          </div>
        ) : selectLineTab ? (
          <div className="chart-div">
            <LineChart chartData={graphData} />
          </div>
        ) : (
          <div className="chart-div-pie">
            <PieChart chartData={graphData} />
          </div>
        )}
        {/* <div className="chat-div">
          <LineChart chartData={graphData} />
        </div>
        <div className="chat-div">
          <PieChart chartData={graphData} />
        </div> */}
        <FaTimes
          className="times-icon"
          onClick={() => setOpenGraphDisplayModal(false)}
        />
      </div>
    </div>
  );
};

export default GraphDisplayModal;
