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

import ShowToggleDevices from "./ShowToggleDevices";
import UserDevices from "./UserDevices";

export const Home = () => {
  const temperature = 52;

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={7} height="100%">
        <Paper
          className="greetings"
          elevation={3}
          sx={{
            p: 2,
            ml: 2,
            bgcolor: "rgb(242, 242, 242)",
            borderRadius: "1.5rem",
          }}
        >
          <Typography
            variant="h5"
            fontFamily="lato,sans-serif;"
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
          boxSizing="border-box"
          boxShadow="5px 5px 5px 5px #ccc"
          borderRadius="1.5rem"
          margin="2%"
          padding="2%"
        ></Box>

        <Grid item sm={10}></Grid>
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
              bgcolor: "rgb(242, 242, 242)",
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
      </Grid>
    </>
  );
};

Device.propTypes = {
  id: PropTypes.string,
  showStatus: PropTypes.bool,
  toggle: PropTypes.bool,
};
