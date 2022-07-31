import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";

const AppRouter = ({ isAuthenticated }) => {
  return (
    <Router>
      {isAuthenticated && <Navigation />}
      <Switch>
        {isAuthenticated ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
