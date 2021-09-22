import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
    <Grid
      container
      sx={{ height: "100vh", width: "100vw" }}
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Router>
        <Fragment>
          <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={2}>
            <Menu />
          </Grid>
          <Grid item xs={10}>
            <div className="container">
              <Route exact path="/" component={Home} />
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/logout" component={Logout} />
              </Switch>
            </div>
          </Grid>
        </Fragment>
      </Router>
    </Grid>
  );
}
