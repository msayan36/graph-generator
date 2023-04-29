/* eslint-disable no-tabs */
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import GraphDisplayModal from "./GraphDisplayModal";

const GraphCodeModal = ({
  graphModalOpen,
  setGraphModalOpen,
  setGraphRunCode,
  graphInputValFunc,
  codeRes,
  codeErr,
}) => {
  const [graphInputVal, setGraphInputVal] = useState("");

  const [openGraphDisplayModal, setOpenGraphDisplayModal] = useState(false);

  const graphData = `#include <stdio.h>
#define MAX_LIMIT 20
int main()
{
   char label_name[MAX_LIMIT];
   int no_of_labels;
   scanf("%d", &no_of_labels);
   
   int labels[no_of_labels], data[no_of_labels];
   
   for(int i=0; i<no_of_labels; i++){
   	scanf("%d", &labels[i]);
   }
   
   for(int i=0; i<no_of_labels; i++){
   	scanf("%d", &data[i]);
   }
   
   printf("%d ", no_of_labels);
   
   fgets(label_name, MAX_LIMIT, stdin);
   
   for(int i=0; i<no_of_labels; i++){
   	printf("%d ", labels[i]);
   }
   printf("%s ", label_name);
   
   for(int i=0; i<no_of_labels; i++){
   	printf("%d ", data[i]);
   }
 
   return 0;
}`;

  return (
    <>
      <div
        className={`parent_modal ${
          graphModalOpen ? "modal-open" : "modal-close"
        }`}
      >
        <div className="modal-graph">
          <p className="modal-text">{graphData}</p>
          <input
            type="text"
            placeholder="Enter Input Data"
            className="input-box"
            value={graphInputVal}
            onChange={(e) => setGraphInputVal(e.target.value)}
          />
          <div>
            <button
              className="run-btn"
              onClick={() => {
                setOpenGraphDisplayModal(true);
                setGraphModalOpen(false);
                graphInputValFunc(graphInputVal);
                setGraphRunCode(true);
              }}
            >
              Generate Graph
            </button>
          </div>
          <FaTimes
            className="times-icon"
            onClick={() => setGraphModalOpen(false)}
          />
        </div>
      </div>
      <GraphDisplayModal
        openGraphDisplayModal={openGraphDisplayModal}
        setOpenGraphDisplayModal={setOpenGraphDisplayModal}
        codeRes={codeRes}
        codeErr={codeErr}
      />
    </>
  );
};

export default GraphCodeModal;
