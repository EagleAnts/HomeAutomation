import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Responsive } from "./Responsive";

import "./App.css";

// Components
import { Navbar } from "./components/Navbar";
import { Menu } from "./components/Menu";
import { Dashboard } from "./components/Dashboard";
import { AllDevices } from "./components/AllDevices";
import { Grid } from "@mui/material";

export default function App() {
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
                {/* <Route exact path="/" component={Home} /> */}
                <Route path="/dashboard" component={Dashboard} />
                <Switch>
                  <Route path="/devices" component={AllDevices} />
                  {/* <Route path="/logout" component={Logout} /> */}
                </Switch>
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
                {/* <Route exact path="/" component={Home} /> */}
                <Route path="/dashboard" component={Dashboard} />
                <Switch>
                  <Route path="/devices" component={AllDevices} />
                  {/* <Route path="/logout" component={Logout} /> */}
                </Switch>
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
