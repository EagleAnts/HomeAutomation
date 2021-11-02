import React from "react";
import "./carousel.css";
import { IconButton } from "@mui/material";
import { Paper, Box } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const DeviceCarousel = (props) => {
  const scrollContainer = (direction) => {
    const el = document.querySelector(".device-container");
    const far = (el.clientWidth / 2) * direction;
    el.scrollBy({ left: far, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <h2>{props.area}</h2>
      <div className="wrapper">
        <IconButton
          aria-label="prev"
          sx={{ color: "#7b40f2" }}
          onClick={scrollContainer.bind(null, -1)}
        >
          <AiOutlineLeft />
        </IconButton>
        <Box className="device-container">
          {props.devices.map((device) => {
            return (
              <Paper
                key={device.deviceID}
                elevation={4}
                className="device"
                sx={{
                  display: "flex",
                  borderRadius: "1.25rem",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <img
                  src={device.description.icon}
                  alt="icon"
                  height="60px"
                  width="60px"
                />
                {device.name}
              </Paper>
            );
          })}
        </Box>

        <IconButton
          aria-label="next"
          sx={{ color: "#7b40f2" }}
          onClick={scrollContainer.bind(null, 1)}
        >
          <AiOutlineRight />
        </IconButton>
      </div>
    </div>
  );
};

export default DeviceCarousel;
