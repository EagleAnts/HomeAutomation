import React, { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Responsive } from "./Responsive";
import "./App.css";
import { useDispatch } from "react-redux";
import { getDevices } from "./redux/actions/action";

//Socket.io

import { SocketContext } from "./context/socket";

// Components
import { Navbar } from "./components/Navbar";
import { Menu } from "./components/Menu";

import { Grid } from "@mui/material";
import Routes from "./Routes";

export default function App() {
  console.log("rendering....");

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevices());

    socket.on("connect", () => {
      console.log(`You Connected with id ${socket.id}`);
    });

    socket.on("connect_error", () => {
      console.log("Connection failed ...");
    });

    socket.on("disconnect", () => {
      console.log("You are now disconnected");
      socket.disconnect();
    });
  }, [dispatch, socket]);

  return (
    <div className="App">
      <Responsive displayIn={["LargerThanLaptop"]}>
        <Grid
          container
          sx={{ height: "inherit", width: "inherit" }}
          justifyContent="flex-start"
          alignItems="flex-start"
          m={1}
        >
          <Router>
            <Fragment>
              <Grid item xs={12} sm={12} md={12}>
                <Navbar />
              </Grid>
              <Grid item md={1} lg={1} mt={2} p={2}>
                <Menu title="menu" />
              </Grid>
              <Grid
                item
                md={11}
                lg={11}
                mt={2}
                container
                spacing={3}
                alignItems="flex-start"
              >
                <Routes />
              </Grid>
            </Fragment>
          </Router>
        </Grid>
      </Responsive>

      <Responsive displayIn={["Laptop", "Mobile", "Tablet"]}>
        <Grid
          container
          sx={{ height: "inherit", width: "inherit" }}
          justifyContent="center"
          spacing="2"
          m={2}
        >
          <Router>
            <Fragment>
              <Grid item flexflow="row wrap" xs={12} sm={12} md={12}>
                <Navbar />
              </Grid>
              <Grid
                item
                md={12}
                container
                spacing={2}
                justifyContent="center"
                mt={1}
              >
                <Routes />
              </Grid>
              <Grid item md={2}>
                <Menu title="mobile-menu" />
              </Grid>
            </Fragment>
          </Router>
        </Grid>
      </Responsive>
    </div>
  );
}
