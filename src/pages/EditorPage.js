import React, { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import InputModal from "../components/InputModal";
import GraphCodeModal from "../components/GraphCodeModal";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import qs from "qs";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  const [runCode, setRunCode] = useState(false);
  const [graphRunCode, setGraphRunCode] = useState(false);
  const [codeRes, setCodeRes] = useState(null);
  const [codeErr, setCodeErr] = useState(null);
  const [clients, setClients] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [inputDataGet, setInputDataGet] = useState("");

  const graphData = `#include<stdio.h>
                        int main() {
                          printf("Hello World!");
                          return 0;
                        }`;

  const inputValFunc = (inputVal) => {
    setInputDataGet(inputVal);
  };

  const graphInputValFunc = (graphInputVal) => {
    setInputDataGet(graphInputVal);
  };

  const [graphCode, setGraphCode] = useState(null);
  // console.log(graphCode);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for Disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  useEffect(() => {
    const data = qs.stringify({
      code: codeRef.current,
      language: "c",
      input: inputDataGet,
      // input: "7 8", // multiple input is given like this
    });
    const config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response);

        if (response.data.error) {
          // console.log(response.data.error.split("error: ")[1]);
          console.log(response.data.error);
          // toast.error(response.data.error.split("error: ")[1]);
          // setCodeErr(response.data.error.split("error: ")[1]);
          setCodeErr(response.data.error);
        }

        if (response.data.output) {
          console.log(response.data.output);
          // toast.success(response.data.output);
          setCodeRes(response.data.output);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setCodeErr(null);
    setCodeRes(null);
    setRunCode(false);
  }, [runCode]);

  useEffect(() => {
    const data = qs.stringify({
      code: `#include <stdio.h>
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
}`,
      language: "c",
      input: inputDataGet,
      // input: "7 8", // multiple input is given like this
    });
    const config = {
      method: "post",
      url: "https://api.codex.jaagrav.in",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response);

        if (response.data.error) {
          // console.log(response.data.error.split("error: ")[1]);
          console.log(response.data.error);
          // toast.error(response.data.error.split("error: ")[1]);
          // setCodeErr(response.data.error.split("error: ")[1]);
          setCodeErr(response.data.error);
        }

        if (response.data.output) {
          console.log(response.data.output);
          // toast.success(response.data.output);
          setCodeRes(response.data.output);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setCodeErr(null);
    setCodeRes(null);
    setRunCode(false);
  }, [graphRunCode]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (error) {
      toast.error("Could not copy room ID");
      console.error(error);
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/code-sync.png" alt="logo" className="logoImage" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button
          className="btn runBtn"
          onClick={() => {
            // setGraphCode(graphData);
            // console.log(graphCode);
            setGraphModalOpen(true);
          }}
        >
          Generate Graph
        </button>
        {/* <button
          className="btn runBtn runBtnLow"
          onClick={() => setRunCode(true)}
        >
          Run Code
        </button> */}
        <button
          className="btn runBtn runBtnLow"
          onClick={() => setModalOpen(true)}
        >
          Run Code
        </button>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          graphCode={graphCode}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
      <InputModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setRunCode={setRunCode}
        inputValFunc={inputValFunc}
        codeRes={codeRes}
        codeErr={codeErr}
      />
      <GraphCodeModal
        graphModalOpen={graphModalOpen}
        setGraphModalOpen={setGraphModalOpen}
        setGraphRunCode={setGraphRunCode}
        graphInputValFunc={graphInputValFunc}
        codeRes={codeRes}
        codeErr={codeErr}
      />
    </div>
  );
};

export default EditorPage;
