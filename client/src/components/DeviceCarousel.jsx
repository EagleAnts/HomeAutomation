import React from "react";
import "./carousel.css";
import { IconButton, Typography, Backdrop, Modal, Fade } from "@mui/material";
import { Paper, Box, Tooltip, Zoom } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { motion } from "framer-motion";

const style = {
  height: "400px",
  overflowY: "hidden",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  borderRadius: "1.25rem",
  p: 4,
  outline: "none",
};

const DetailsModal = (props) => {
  return (
    <Modal
      aria-labelledby="Device-Details"
      aria-describedby="Device-Modal"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Hello
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

const DeviceCarousel = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <DetailsModal handleClose={handleClose} open={open} />
          {props.devices.map((device) => {
            return (
              <>
                <Tooltip
                  key={device.deviceID}
                  title={<Typography fontSize="1rem">{device.name}</Typography>}
                  arrow
                  TransitionComponent={Zoom}
                >
                  <Paper
                    onClick={handleOpen}
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
              </>
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
