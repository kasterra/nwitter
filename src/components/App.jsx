import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { auth } from "fbInstance";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);
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
