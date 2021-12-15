import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import AddDeviceModal from "./TransitionModal";
import Carousel from "./DeviceCarousel";
import { motion } from "framer-motion";
import { Stack, Box, Typography, Backdrop, Modal, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { showDeviceDetails } from "../redux/actions/action";
import { DeviceModalSwitch } from "./Switch";
import { changeStatus } from "../redux/actions/action";

const gridAnimations = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const style = {
  display: "flex",
  flexDirection: "column",
  height: "400px",
  overflowY: "hidden",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  borderRadius: "1.25rem",
  p: 4,
  outline: "none",
};

const DetailsDiv = styled("div")(() => ({
  width: "100%",
  display: "inline-flex",
  justifyContent: "space-between",
}));

const DetailsTypo = styled(Typography)(() => ({
  fontFamily: "lato, sans-serif;",
}));

const DetailsModal = (props) => {
  const dispatch = useDispatch();

  const deviceID = useSelector((state) => state.AllDevices.selectedDevice);

  const { active: deviceStatus } = useSelector((state) => {
    if (deviceID) {
      return state.UserDevices.DeviceStatus.find((el) => el.id === deviceID);
    }
    return { active: false };
  });

  const device = !deviceID
    ? {}
    : props.devices.find((el) => el.deviceID === deviceID);

  const onClickHandler = (deviceID) => {
    dispatch(changeStatus({ id: deviceID, active: !deviceStatus }));
    // currentSocket.emit("device_event", { id: deviceID, active: !isActive });
  };

  const handleClose = () => {
    dispatch(showDeviceDetails(""));
  };

  console.log(device);

  return !deviceID ? null : (
    <Modal
      aria-labelledby="Device-Details"
      aria-describedby="Device-Modal"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deviceID ? true : false}>
        <Box sx={style}>
          <Stack
            height={100}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h6" component="h2">
              {!device ? "" : device.name}
            </Typography>
            <DeviceModalSwitch
              checked={deviceStatus || false}
              onClick={() => onClickHandler(deviceID)}
            />
          </Stack>
          <Box
            sx={{
              height: "300px",
              overflowY: "scroll",
              borderRadius: "2%",
              padding: "5%",
              boxShadow: "inset 0 0 0.2rem 0 #ccc",
            }}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <DetailsDiv>
                <DetailsTypo variant="h6">Area </DetailsTypo>
                <DetailsTypo variant="h6" sx={{ textTransform: "capitalize" }}>
                  {device.area}
                </DetailsTypo>
              </DetailsDiv>
              <div style={{ width: "100%" }}>
                <DetailsTypo variant="h6">Description </DetailsTypo>
                <DetailsTypo variant="body1" textAlign="center">
                  {device.description.description}
                </DetailsTypo>
              </div>
              <DetailsDiv>
                <DetailsTypo variant="h6">Power Consumption </DetailsTypo>
                <DetailsTypo variant="h6">{25}W</DetailsTypo>
              </DetailsDiv>
              <DetailsDiv>
                <DetailsTypo variant="h6">Status </DetailsTypo>
                <DetailsTypo variant="h6">
                  {deviceStatus ? "ON" : "OFF"}
                </DetailsTypo>
              </DetailsDiv>
            </Stack>
          </Box>
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
