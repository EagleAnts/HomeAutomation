import React, { useEffect } from "react";

import { useDispatch, useSelector, useStore } from "react-redux";
import { selectedDevice } from "../redux/actions/action";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

const buildToggleDevices = (dispatch, devicesList, selectedRoom) => {
  const handleOnChange = (deviceID) => {
    dispatch(selectedDevice(deviceID));
  };
  return devicesList
    .filter((el) => el.area === selectedRoom)
    .map((el) => {
      return (
        <motion.div
          key={el.name + "-" + el.area}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <input
            type="radio"
            name="buttonGroup"
            id={el.name + "-" + el.area}
            onChange={() => handleOnChange(el.deviceID)}
          />
          <label htmlFor={el.name + "-" + el.area}>
            <CgSmartHomeRefrigerator fontSize="50px" />
            {el.name}
          </label>
        </motion.div>
      );
    });
};

const StyledDiv = styled("div")({
  margin: "2rem",
  padding: "1rem",
  textAlign: "center",
  opacity: 0.5,
  pointerEvents: "none",
});

const ToggleDevices = () => {
  const storeData = useStore();

  const dispatch = useDispatch();

  let toggleDevicesList = [];

  const selectedRoom = useSelector((state) => state.ToggleDevices.selectedRoom);

  const currentRoomDevices = useSelector(
    (state) => state.UserDevices.myDevices[selectedRoom]
  );
  const activeDevice = useSelector((state) => state.ToggleDevices.activeDevice);

  useEffect(() => {
    if (activeDevice) {
      const [selectedDevice] = currentRoomDevices.filter(
        (el) => el.deviceID === activeDevice
      );
      const id = selectedDevice.name + "-" + selectedDevice.area;
      document.getElementById(id).checked = true;
    }
  }, []);

  if (selectedRoom) {
    toggleDevicesList = buildToggleDevices(
      dispatch,
      currentRoomDevices,
      selectedRoom
    );
  }

  return (
    <>
      {!selectedRoom ? (
        <StyledDiv>
          Area Not Selected ! <br />
          Please Choose any Area to Show Devices
        </StyledDiv>
      ) : (
        <Box
          className="devices"
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            overflowX: "scroll",
            columnGap: "2%",
          }}
          justifySelf="center"
          justifyContent="flex-start"
          borderRadius="1.5rem"
          margin="2%"
          padding="2%"
          alignItems="center"
        >
          {toggleDevicesList}
        </Box>
      )}
    </>
  );
};

export default ToggleDevices;
