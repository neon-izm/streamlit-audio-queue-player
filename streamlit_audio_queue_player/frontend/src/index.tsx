import React from "react";
import ReactDOM from "react-dom";
import AudioPlayer from "./AudioPlayer";

// withStreamlitConnection を AudioPlayer 内で既に利用しているため、ここでは単純にレンダリング
// @ts-ignore
ReactDOM.render(
  <React.StrictMode>
    <AudioPlayer />
  </React.StrictMode>,
  document.getElementById("root")
);