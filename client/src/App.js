import React, { Fragment, useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Responsive } from "./Responsive";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

//Socket.io
import { SocketContext } from "./context/socket";

// Components
import { Navbar } from "./components/Navbar";
import { Menu } from "./components/Menu";

import { Grid } from "@mui/material";
import Routes from "./Routes";
import Loading from "./Loading";

export default function App() {
  const [loading] = useFetch(true);
  const socket = useContext(SocketContext);

  useEffect(() => {
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
  }, [socket]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Responsive displayIn={["LargerThanLaptop"]}>
        <div className="App">
          <Grid
            container
            sx={{ height: "inherit", width: "inherit" }}
            justifyContent="flex-start"
            alignItems="flex-start"
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
        </div>
      </Responsive>

      <Responsive displayIn={["Laptop", "Mobile", "Tablet"]}>
        <div className="MobileApp">
          <Grid
            container
            sx={{ height: "inherit", width: "inherit" }}
            justifyContent="center"
            spacing="2"
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
                <Grid item md={2} sx={{ zIndex: "100" }}>
                  <Menu title="mobile-menu" />
                </Grid>
              </Fragment>
            </Router>
          </Grid>
        </div>
      </Responsive>
    </>
  );
}
