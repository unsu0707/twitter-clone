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
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsAuthenticated(false);
      }
      setInitialized(true);
    });
  }, []);
  const refreshUserObj = () => {
    const user = auth.currentUser;

    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {initialized ? (
        <AppRouter isAuthenticated={isAuthenticated} userObj={userObj} refreshUserObj={refreshUserObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Twitter-Copy</footer>
    </>
  );
}

export default App;
