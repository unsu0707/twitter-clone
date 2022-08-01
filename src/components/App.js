import React from "react";
import AppRouter from "components/Router";
import { auth } from "firebaseInstance";

function App() {
  const [initialized, setInitialized] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userObj, setUserObj] = React.useState(null);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserObj(user);
      } else {
        setIsAuthenticated(false);
      }
      setInitialized(true);
    });
  }, []);
  return (
    <>
      {initialized ? <AppRouter isAuthenticated={isAuthenticated} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Twitter-Copy</footer>
    </>
  );
}

export default App;
