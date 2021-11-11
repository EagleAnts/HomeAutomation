import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import AddDeviceModal from "./TransitionModal";
import Carousel from "./DeviceCarousel";
import { motion } from "framer-motion";
import { Box, Typography, Backdrop, Modal, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showDeviceDetails } from "../redux/actions/action";

const gridAnimations = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

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
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showDeviceDetails(""));
  };
  const deviceID = useSelector((state) => state.AllDevices.selectedDevice);
  const [device] = props.devices.filter((el) => el.deviceID === deviceID);

  return (
    <Modal
      aria-labelledby="Device-Details"
      aria-describedby="Device-Modal"
      open={deviceID ? true : false}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deviceID ? true : false}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {!device ? "" : device.name}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

const BuildCarousel = (props) => {
  const areaList = [];

  for (const area in props.area) {
    areaList.push(
      <Carousel key={area} area={area} devices={props.area[area]} />
    );
  }

  return areaList;
};

export const AllDevices = () => {
  const devices = useSelector((state) => state.UserDevices.myDevices);

  const area = {};

  devices.forEach((el) => {
    if (!area[el.area]) area[el.area] = [];
    area[el.area].push(el);
  });

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        component={motion.div}
        variants={gridAnimations}
        initial="out"
        animate="in"
        exit="out"
      >
        <AddDeviceModal />
        <BuildCarousel area={area} />
        <DetailsModal devices={devices} />
      </Grid>
    </>
  );
};
