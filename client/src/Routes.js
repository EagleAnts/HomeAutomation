import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import { AllDevices } from "./components/AllDevices";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect exact to="/dashboard" />
      </Route>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/devices" exact component={AllDevices} />
    </Switch>
  );
};

export default Routes;
