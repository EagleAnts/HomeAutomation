import React from "react";
import "./carousel.css";
import { IconButton, Typography } from "@mui/material";
import { Paper, Box, Tooltip, Zoom } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { showDeviceDetails } from "../redux/actions/action";

const DeviceCarousel = (props) => {
  const dispatch = useDispatch();

  const handleOpen = (deviceID) => {
    dispatch(showDeviceDetails(deviceID));
  };

  const scrollContainer = (direction, event) => {
    const el =
      direction < 0 ? event.target.nextSibling : event.target.previousSibling;
    const far = (el.clientWidth / 2) * direction;
    el.scrollBy({ left: far, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <h2>{props.area}</h2>
      <div className="wrapper">
        <IconButton
          id="prev"
          aria-label="prev"
          sx={{ color: "#7b40f2" }}
          onClick={scrollContainer.bind(this, -1)}
        >
          <AiOutlineLeft />
        </IconButton>
        <Box className="device-container">
          {props.devices.map((device) => {
            return (
              <Tooltip
                key={device.deviceID}
                title={<Typography fontSize="1rem">{device.name}</Typography>}
                arrow
                TransitionComponent={Zoom}
              >
                <Paper
                  onClick={() => handleOpen(device.deviceID)}
                  component={motion.div}
                  whileTap={{ scale: 0.9 }}
                  elevation={4}
                  className="device selectDisable"
                  sx={{
                    display: "flex",
                    borderRadius: "1.25rem",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    loading="lazy"
                    src={device.description.icon}
                    alt="icon"
                    height="60px"
                    width="60px"
                  />
                </Paper>
              </Tooltip>
            );
          })}
        </Box>

        <IconButton
          id="next"
          aria-label="next"
          sx={{ color: "#7b40f2" }}
          onClick={scrollContainer.bind(this, 1)}
        >
          <AiOutlineRight />
        </IconButton>
      </div>
    </div>
  );
};

export default DeviceCarousel;
