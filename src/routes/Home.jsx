import React, { useState, useEffect } from "react";
import { dbService } from "fbInstance";
import { collection, onSnapshot } from "firebase/firestore";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweetList, setNweetList] = useState([]);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweetList(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} nweetList={nweetList} />
    </div>
  );
};

export default Home;
