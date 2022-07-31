import React from "react";
import AppRouter from "components/Router";
import { auth } from "firebaseInstance";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(auth.currentUser);
  return (
    <>
      <AppRouter isAuthenticated={isAuthenticated} />
      <footer>&copy; {new Date().getFullYear()} Twitter-Copy</footer>
    </>
  );
}

export default App;
