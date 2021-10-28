import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div style={{ color: "#7b40f2" }} className="la-ball-pulse">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
