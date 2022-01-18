import React, { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";
import { dbService, storageService } from "fbInstance";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweetList, setNweetList] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      let attachmentURL = "";
      if (attachment) {
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        attachmentURL = await getDownloadURL(fileRef);
      }
      try {
        const docRef = await addDoc(collection(dbService, "nweets"), {
          nweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentURL,
        });
        setNweet("");
        setAttachment(null);
      } catch (error) {
        console.error(error);
      }
    },
    [attachment, nweet, userObj.uid]
  );

  const onChange = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  }, []);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const imageFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const {
        currentTarget: { result },
      } = event;
      setAttachment(result);
    };
    reader.readAsDataURL(imageFile);
  };

  const onClearPhoto = () => setAttachment(null);

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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img
              src={attachment}
              alt="attachmentFile"
              width="50px"
              height="50px"
            />
            <button onClick={onClearPhoto}>Clear photo</button>
          </div>
        )}
      </form>
      <div>
        {nweetList.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
