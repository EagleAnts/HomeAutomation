import React, { useEffect, useRef, useState } from "react";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { changeStatus } from "../redux/actions/action";

import Dropdown from "./Dropdown";
import { CircularProgressComponent } from "./CircularProgress";

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
    state.UserDevices.DeviceStatus.filter((el) => el.id === props.deviceID).map(
      (el) => el.active
    )
  );

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
      dispatch(changeStatus({ id: props.deviceID, active: true }));
    else if (text === "OFF")
      dispatch(changeStatus({ id: props.deviceID, active: false }));
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

const DeviceStatus = (props) => {
  const activeDevice = useSelector((state) => state.ToggleDevices.activeDevice);

  const [isLoading, setLoading] = useState(null);

  function fakeTimeOut() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  }

  useEffect(() => {
    setLoading(true);
    fakeTimeOut().then(() => {
      console.log("fakeTimeout");
      setLoading(false);
    });
  }, [activeDevice]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            height: "18.25rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "#7b40f2" }} />
        </Box>
      ) : !activeDevice ? (
        <StyledDiv>
          No Device Selected! <br />
          Please Choose any Device to Show it's Status
        </StyledDiv>
      ) : (
        <>
          <Card
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
              Currently Selected Device is : {activeDevice}
              <StatusDropdown deviceID={activeDevice} />
            </div>

            <div id="status-indicator" className="deviceOff">
              <CircularProgressComponent
                incrementBy={5}
                deviceID={activeDevice}
              />
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default DeviceStatus;
