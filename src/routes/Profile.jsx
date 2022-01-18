import { authService, dbService } from "fbInstance";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { collection, orderBy, query, where, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogoutClick = useCallback(() => {
    signOut(authService);
  }, []);

  const getMyNweets = async () => {
    const nweets = collection(dbService, "nweets");
    const q = query(
      nweets,
      where("creatorId", "==", `${userObj.uid}`),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
    refreshUser();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
