import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import AddDeviceModal from "./TransitionModal";
import Carousel from "./DeviceCarousel";
import { motion } from "framer-motion";
import { Stack, Box, Typography, Backdrop, Modal, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDevice,
  showDeviceDetails,
  showLoadingIcon,
  removeStatus,
  removeDeviceArea,
  selectedDevice,
} from "../redux/actions/action";
import { DeviceModalSwitch } from "./Switch";
import { changeStatus } from "../redux/actions/action";
import Loader from "./Loader/Loader";
import { BsTrash } from "react-icons/bs";
import encryptedPost from "../encryptedPost";

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

export const DetailsModal = (props) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const deviceID = useSelector((state) => state.AllDevices.selectedDevice);
  const deviceArea = useSelector((state) => state.AllDevices.deviceArea);
  const loading = useSelector((state) => state.AllDevices.showLoading);
  const { active: deviceStatus } = useSelector((state) => {
    if (deviceID) {
      return state.DeviceStatus.find((el) => el.id === deviceID);
    }
    return { active: false };
  });

  const device = useRef(null);
  const { devices } = props;

  if (deviceID) {
    device.current = devices[deviceArea].find((el) => el.deviceID === deviceID);
  } else device.current = "";

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      history.replace("/devices");
      const [name, type, area] = query.split("-");
      const { deviceID } = devices[area].find(
        (el) =>
          el.name === name && el.description.type === type && el.area === area
      );
      dispatch(showDeviceDetails({ deviceID, deviceArea: area }));
      dispatch(showLoadingIcon(false));
    }
  }, [location]);

  const removeDeviceHandler = (deviceID) => () => {
    dispatch(showLoadingIcon(true));
    encryptedPost({ deviceID }, "api/device/remove").then((res) =>
      console.log(res.data)
    );
    dispatch(selectedDevice(""));
    dispatch(removeDevice({ deviceID, deviceArea: deviceArea }));
    dispatch(removeStatus({ deviceID, deviceArea: deviceArea }));
    handleClose();
    dispatch(showLoadingIcon(false));
  };

  const onClickHandler = (deviceID) => {
    dispatch(changeStatus({ id: deviceID, active: !deviceStatus }));
    // currentSocket.emit("device_event", { id: deviceID, active: !isActive });
  };

  const handleClose = () => {
    dispatch(showDeviceDetails(""));
  };

  return loading ? (
    <Loader />
  ) : !deviceID ? null : (
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
            height={50}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h6" component="h2">
              {!device.current ? "" : device.current.description.type}
            </Typography>
            <DeviceModalSwitch
              checked={deviceStatus || false}
              onClick={() => onClickHandler(deviceID)}
            />
          </Stack>
          <Box
            sx={{
              height: "300px",
              borderRadius: "2%",
              margin: "1%",
              padding: "2%",
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
                <DetailsTypo variant="h6">Name </DetailsTypo>
                <DetailsTypo variant="h6" sx={{ textTransform: "capitalize" }}>
                  {device.current ? device.current.name : ""}
                </DetailsTypo>
              </DetailsDiv>

              <DetailsDiv>
                <DetailsTypo variant="h6">Area </DetailsTypo>
                <DetailsTypo variant="h6" sx={{ textTransform: "capitalize" }}>
                  {device.current ? device.current.area : ""}
                </DetailsTypo>
              </DetailsDiv>
              <div style={{ width: "100%" }}>
                <DetailsTypo variant="h6">Description </DetailsTypo>
                <DetailsTypo variant="body1" textAlign="center">
                  {device.current ? device.current.description.description : ""}
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
          <Button onClick={removeDeviceHandler(deviceID)} color="error">
            <BsTrash size={25} pointerEvents="none" />
            <DetailsTypo
              variant="subtitle1"
              sx={{ textTransform: "capitalize", pointerEvents: "none" }}
              textAlign="center"
              padding={1}
            >
              Remove Device
            </DetailsTypo>
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

const BuildCarousel = (props) => {
  const { area } = props;

  return Object.keys(area).map((el) => {
    if (area[el].length !== 0)
      return <Carousel key={el} area={el} devices={area[el]} />;
  });
};

export const AllDevices = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.UserDevices.myDevices);

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
        <BuildCarousel area={devices} dispatch={dispatch} />
        <DetailsModal devices={devices} />
      </Grid>
    </>
  );
};
