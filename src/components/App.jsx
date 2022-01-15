import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbInstance";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = authService;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, [auth]);
  return (
    <div className="App">
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        <span>Initializing...</span>
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
