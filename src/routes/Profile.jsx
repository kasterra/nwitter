import { auth } from "fbInstance";
import { signOut } from "firebase/auth";
import React, { useCallback } from "react";

const Profile = () => {
  const onLogoutClick = useCallback(() => {
    signOut(auth);
  }, []);
  return (
    <>
      <span>Profile</span>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
