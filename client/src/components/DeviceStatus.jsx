import React, { useEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { useSelector, useDispatch } from "react-redux";
import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { changeStatus } from "../redux/actions/action";
import { motion } from "framer-motion";
import { deviceStatusList } from "../optionsList/devicesList";

import Dropdown from "./Dropdown";
import { CircularProgressComponent } from "./CircularProgress";
import { getEncryptParams } from "../cryptoFunctions/encrypt";

const StyledDiv = styled("div")({
  margin: "2rem",
  padding: "1rem",
  textAlign: "center",
  opacity: 0.5,
  pointerEvents: "none",
});

const StatusDropdown = (props) => {
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropDownRef, false);
  const [haveText, sethaveText] = useState("Select Status");

  const [deviceStatus] = useSelector((state) =>
    state.DeviceStatus.filter((el) => el.id === props.deviceID).map(
      (el) => el.active
    )
  );
  const userID = useSelector((state) => state.UserDetails.userID);

  useEffect(() => {
    if (deviceStatus) {
      document.getElementById("status-indicator").classList.remove("deviceOff");
      sethaveText("ON");
    } else if (deviceStatus !== undefined && !deviceStatus) {
      document.getElementById("status-indicator").classList.add("deviceOff");
      sethaveText("OFF");
    }
  }, [deviceStatus]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleText = (ev) => {
    const text = ev.currentTarget.textContent;
    if (text === "ON")
      dispatch(changeStatus({ userID, id: props.deviceID, active: true }));
    else if (text === "OFF")
      dispatch(changeStatus({ userID, id: props.deviceID, active: false }));
    sethaveText(text);
  };

  const options = ["ON", "OFF"];

  return (
    <Dropdown
      id="statusDropdown"
      options={options}
      description="Status"
      handleText={handleText}
      dropDownRef={dropDownRef}
      onClick={handleClick}
      isActive={isActive}
      haveText={haveText}
    />
  );
};

const DeviceStatus = () => {
  const myDevices = useSelector((state) => state.UserDevices.myDevices);
  const selectedRoom = useSelector((state) => state.ToggleDevices.selectedRoom);
  const activeDevice = useSelector((state) => state.ToggleDevices.activeDevice);

  const deviceDetails = useRef({});

  if (activeDevice) {
    myDevices[selectedRoom]
      .filter((el) => el.deviceID === activeDevice)
      .forEach((el) => {
        const deviceType = el.description.type;
        deviceDetails.current = {
          type: deviceType,
          status: deviceStatusList[deviceType].status,
          icon: deviceStatusList[deviceType].icon,
          label: deviceStatusList[deviceType].label || " ",
          incrementBy: deviceStatusList[deviceType].incrementBy || " ",
        };
      });
  }

  // const [isLoading, setLoading] = useState(null);

  // function fakeTimeOut() {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  // }

  // useEffect(() => {
  //   setLoading(true);
  //   fakeTimeOut().then(() => {
  //     setLoading(false);
  //   });
  // }, [activeDevice]);

  // isLoading ? (
  //   <Box
  //     sx={{
  //       height: "18.25rem",
  //       width: "100%",
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <CircularProgress sx={{ color: "#7b40f2" }} />
  //   </Box>
  // ) :

  return (
    <>
      {!activeDevice ? (
        <StyledDiv>
          No Device Selected! <br />
          Please Choose any Device to Show it's Status
        </StyledDiv>
      ) : (
        <>
          <Card
            component={motion.div}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            key={activeDevice}
            className="selectDisable"
            elevation={3}
            sx={{
              display: "flex",
              position: "relative",
              flexFlow: "column wrap",
              alignItems: "center",
              p: 2,
              borderRadius: "1.25rem",
              bgcolor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* <img
                src="https://res.cloudinary.com/homeautomation/image/upload/v1636729490/weather-assests/2_whgnmv.png"
                alt="weather-icon"
                height="80px"
                width="80px"
                style={{ verticalAlign: "middle", marginRight: 8 }}
              /> */}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  fontFamily: "lato, sans-serif;",
                }}
              >
                {deviceDetails.current.type}
              </Typography>
              <StatusDropdown deviceID={activeDevice} />
            </div>
            <div id="status-indicator" className="deviceOff">
              {!deviceDetails.current.status ? (
                <img
                  src={deviceDetails.current.icon}
                  alt="device_png"
                  style={{ height: "inherit" }}
                />
              ) : (
                <CircularProgressComponent
                  incrementBy={deviceDetails.current.incrementBy}
                  label={deviceDetails.current.label}
                  deviceID={activeDevice}
                />
              )}
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default DeviceStatus;
