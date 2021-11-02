import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Dashboard } from "./components/Dashboard";
import { AllDevices } from "./components/AllDevices";

const Routes = () => {
  return (
    <AnimatePresence>
      <Switch>
        <Route exact path="/">
          <Redirect exact to="/dashboard" />
        </Route>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/devices" exact component={AllDevices} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
