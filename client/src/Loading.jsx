import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div className="la-ball-pulse la-1x">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
