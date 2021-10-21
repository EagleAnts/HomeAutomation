import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaTemperatureLow } from "react-icons/fa";
import { BsCloud } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { Device } from "./Device";
import { Box } from "@mui/system";
import { Card } from "@mui/material";
// import Modal from "./TransitionModal";
import DeviceInfo from "./DeviceStatus";
import Chart from "./Consumption/PowerConsumption";
import Dropdown from "./Dropdown";

import UserDevices from "./UserDevices";
import ToggleDevices from "./ToggleDevices";

export const Dashboard = (props) => {
  const temperature = 40;
  const options = [
    "Living Room",
    "Dining Room",
    "Bedroom",
    "Hall",
    "Kitchen",
    "Bathroom",
  ];

  const handleClick = (e) => {
    const id = e.target.id;
    props.showDropdown({ id });
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Paper
          className="greetings"
          elevation={3}
          sx={{
            p: 2,
            bgcolor: "white",
            borderRadius: "1.5rem",
          }}
        >
          <Typography
            variant="h5"
            fontFamily="roboto,sans-serif;"
            fontSize="2rem"
            fontWeight="600"
            gutterBottom
          >
            Hello, Paritosh!
          </Typography>
          <Typography
            variant="body1"
            fontFamily="rubik, sans-serif;"
            fontSize="1.2rem"
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
        <Box sx={{ display: "flex", flexDirection: "column", margin: "2%" }}>
          <div style={{ alignSelf: "flex-end" }}>
            <Dropdown
              id="areaDropdown"
              options={options}
              description="Rooms"
              onClick={handleClick.bind(this)}
              isOpen={props.areaDropdown}
            />
          </div>
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
          >
            <ToggleDevices />
          </Box>
        </Box>

        <Grid item sm={12} xs={12} md={12}>
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
                <IconButton>
                  <AiOutlineDown />
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
