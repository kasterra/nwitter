import { dbService, storageService } from "fbInstance";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.nweet);

  const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      await deleteDoc(nweetTextRef);
      if (nweetObj.attachmentURL) {
        await deleteObject(ref(storageService, nweetObj.attachmentURL));
      }
    }
  };
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(nweetTextRef, { nweet: newNweet });
    setIsEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div key={nweetObj.id}>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.nweet}</h4>
          {nweetObj.attachmentURL && (
            <img
              src={nweetObj.attachmentURL}
              width="50px"
              height="50px"
              alt="nweetImage"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Update Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
