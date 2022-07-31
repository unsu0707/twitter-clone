import React from "react";
import AppRouter from "components/Router";
import { auth } from "firebaseInstance";

function App() {
  const [initialized, setInitialized] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInitialized(true);
    });
  }, []);
  return (
    <>
      {initialized ? <AppRouter isAuthenticated={isAuthenticated} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Twitter-Copy</footer>
    </>
  );
}

export default App;
