import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";

const AppRouter = ({ isAuthenticated, userObj, refreshUserObj }) => {
  return (
    <Router>
      {isAuthenticated && <Navigation userObj={userObj} />}
      <Routes
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isAuthenticated ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route exact path="/profile" element={<Profile userObj={userObj} refreshUserObj={refreshUserObj} />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
