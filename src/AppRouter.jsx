import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateKyc from "./pages/CreateKyc";
import Home from "./pages/Home";
import KycList from "./pages/KycList";
import UpdateKyc from "./pages/UpdateKyc";
import VerifyKyc from "./pages/VerifyKyc";

const AppRouter = () => {
  return (
    <Router >
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/kyc-list">
          <KycList />
        </Route>
        <Route path="/create-kyc">
          <CreateKyc />
        </Route>
        <Route path="/verify-kyc/:kyc_id">
          <VerifyKyc />
        </Route>
        <Route path="/update-kyc">
          <UpdateKyc />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
