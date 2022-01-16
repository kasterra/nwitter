import React, { useState, useCallback, useEffect } from "react";
import { dbService } from "fbInstance";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweetList, setNweetList] = useState([]);

  console.log(nweetList);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log("onSubmit");
      try {
        const docRef = await addDoc(collection(dbService, "nweets"), {
          nweet,
          createdAt: Date.now(),
        });
        setNweet("");
      } catch (error) {
        console.error(error);
      }
    },
    [nweet]
  );

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  }, []);

  const getNweets = async () => {
    const nweetDB = await getDocs(collection(dbService, "nweets"));
    nweetDB.forEach((document) => {
      const nweetObject = { ...document.data(), id: document.id };
      setNweetList((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweetList.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
