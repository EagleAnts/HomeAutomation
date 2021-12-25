import React from "react";
import { CircularProgress } from "@mui/material";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="overlay">
      <div className="loader">
        <CircularProgress sx={{ color: "#fff" }} />
      </div>
    </div>
  );
};

export default Loader;
