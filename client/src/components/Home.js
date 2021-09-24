import React from "react";
import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaTemperatureLow } from "react-icons/fa";
import { BsCloud } from "react-icons/bs";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import Devices from "./Devices";
import { Box } from "@mui/system";
import { Card } from "@mui/material";

export const Home = () => {
  const temperature = 52;

  return (
    <>
      <Grid item xs={12} sm={12} md={7}>
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
            margin: "2%",
          }}
          justifySelf="center"
          boxSizing="border-box"
          boxShadow="5px 5px 5px #ccc"
          borderRadius="1.5rem"
        >
          <Devices />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={5} container>
        <Grid item md={11}>
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              borderRadius: "1.25rem",
              bgcolor: "rgb(242, 242, 242)",
            }}
          >
            <Typography>My Devices</Typography>
            <Box className="dropdown">
              <Paper
                elevation={3}
                className="dropdown-list"
                sx={{
                  textAlign: "center",
                  borderRadius: "1.2rem",
                }}
              >
                ON <AiOutlineDown />
              </Paper>
            </Box>
            <Tooltip title="View More">
              <IconButton>
                <AiOutlineRight />
              </IconButton>
            </Tooltip>
            <Box className="myDevices">
              <Devices />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
