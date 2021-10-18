import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Responsive } from "./Responsive";

import "./App.css";

// Components
import { Navbar } from "./components/Navbar";
import { Menu } from "./components/Menu";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { Logout } from "./components/Logout";
import { Grid } from "@mui/material";

export default function App() {
  return (
    <div className="App">
      <Responsive displayIn={["Laptop"]}>
        <Grid
          container
          sx={{ height: "100vh", width: "100vw" }}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
        >
          <Router>
            <Fragment>
              <Grid item xs={12} sm={12} md={12}>
                <Navbar />
              </Grid>
              <Grid item md={1} alignItems="flex-start" mt={3}>
                <Menu title="menu" />
              </Grid>
              <Grid
                item
                md={11}
                container
                spacing={3}
                alignItems="flex-start"
                mt={1}
              >
                <Route exact path="/" component={Home} />
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/logout" component={Logout} />
                </Switch>
              </Grid>
            </Fragment>
          </Router>
        </Grid>
      </Responsive>

      <Responsive displayIn={["Mobile", "Tablet"]}>
        <Grid
          container
          sx={{ height: "100vh", width: "100vw" }}
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
                <Route exact path="/" component={Home} />
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/logout" component={Logout} />
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
