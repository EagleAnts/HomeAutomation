import React, { useRef } from "react";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  Tooltip,
  Typography,
  IconButton,
  Card,
  Avatar,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";

import { useHistory } from "react-router-dom";

import { FaTemperatureLow } from "react-icons/fa";
import { BsCloud } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";

import { Device } from "./Device";
import DeviceInfo from "./DeviceStatus";
import Chart from "./Consumption/PowerConsumption";
import Dropdown from "./Dropdown";

import UserDevices from "./UserDevices";
import ToggleDevices from "./ToggleDevices";

import { roomSelected } from "../redux/actions/action";

const gridAnimations = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const AreaDropdown = (props) => {
  const dispatch = useDispatch();

  const dropDownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropDownRef, false);

  const selectedRoom = useSelector((state) => state.ToggleDevices.selectedRoom);

  const handleClick = (e) => {
    setIsActive(!isActive);
  };

  const handleText = (ev) => {
    dispatch(roomSelected(ev.currentTarget.textContent));
  };

  const options = [];

  props.devices.forEach((el) => {
    if (!options.includes(el.area)) options.push(el.area);
  });

  return (
    <Dropdown
      id="areaDropdown"
      options={options}
      handleText={handleText}
      dropDownRef={dropDownRef}
      onClick={handleClick}
      isActive={isActive}
      haveText={!selectedRoom ? "Select Area" : selectedRoom}
    />
  );
};

export const Dashboard = (props) => {
  console.log("Rendering Dashboard...");

  const devices = useSelector((state) => state.UserDevices.myDevices);

  const temperature = 40;

  const history = useHistory();

  const goToDevices = () => {
    history.push("/devices");
  };

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={7}
        component={motion.div}
        variants={gridAnimations}
        initial="out"
        animate="in"
        exit="out"
      >
        <Paper
          component={motion.div}
          className="greetings"
          elevation={3}
          sx={{
            p: 2,
            bgcolor: "white",
            borderRadius: "1.5rem",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Avatar src="./broken-img" sx={{ height: 70, width: 70 }} />
            <Typography
              variant="h5"
              fontFamily="roboto,sans-serif;"
              fontSize="2rem"
              fontWeight="600"
              gutterBottom
            >
              Hello, Paritosh!
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            fontFamily="rubik, sans-serif;"
            fontSize="1.5rem"
            fontWeight="600"
            gutterBottom
          >
            <span>
              Welcome Home! The air quality is good & fresh you can go out today
            </span>
            <br />
            <FaTemperatureLow className="weather" />
            {temperature}
            <span>&#176;C Outdoor temperature</span>
            <br />
            <BsCloud className="weather" />
            <span>Fuzzy cloudy weather</span>
          </Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "2%",
            height: "250px",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ alignSelf: "flex-end" }}>
            <AreaDropdown devices={devices} />
          </div>
          <ToggleDevices />
        </Box>

        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          component={motion.div}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ delay: "1s", type: "spring", stiffness: 30 }}
        >
          <DeviceInfo />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={5}
        container
        rowSpacing={2}
        borderRadius="1.25rem"
        component={motion.div}
        variants={gridAnimations}
        initial="out"
        animate="in"
        exit="out"
      >
        <Grid item xs={12} sm={12} md={12}>
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexFlow: "column wrap",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: "1.25rem",
              bgcolor: "white",
            }}
          >
            <Box className="myDevicesHeader">
              <Typography>My Devices</Typography>
            </Box>
            <Box className="myDevices">
              <UserDevices />
            </Box>
            <Box
              display="flex"
              width="100%"
              alignSelf="flex-start"
              justifyContent="center"
            >
              <Tooltip title="View More">
                <IconButton onClick={goToDevices}>
                  <AiOutlineDown color="#7b40f2" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexFlow: "column wrap",
              justifyContent: "space-around",
              alignItems: "flex-start",
              p: 2,
              borderRadius: "1.25rem",
              bgcolor: "white",
            }}
          >
            <Typography>Power Consumption </Typography>
            <Chart />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

Device.propTypes = {
  id: PropTypes.string,
  showStatus: PropTypes.bool,
  toggle: PropTypes.bool,
};
