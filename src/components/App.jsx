import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbInstance";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userName, setUserName] = useState(
    authService.currentUser?.displayName || ""
  );

  const refreshUser = () => {
    setUserName(authService.currentUser.displayName);
    setUserObj(authService.currentUser);
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(authService.currentUser);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="App">
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
          userName={userName}
        />
      ) : (
        <span>Initializing...</span>
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
