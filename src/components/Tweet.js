import { dbService, storageService } from "firebaseInstance";
import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = React.useState(false);
  const [newTweet, setNewTweet] = React.useState(tweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      if (tweetObj.attachment) {
        storageService.refFromURL(tweetObj.attachment).delete();
      }
      dbService.collection("tweets").doc(tweetObj.id).delete();
    }
  };
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewTweet(value);
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("tweets").doc(tweetObj.id).update({
      text: newTweet,
    });
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <form onSubmit={onEditSubmit}>
          <input value={newTweet} onChange={onChange} type="text" maxLength={120} />
          <input type="submit" value="Update" />
        </form>
      ) : (
        <>
          <div>
            {tweetObj.attachment && <img src={tweetObj.attachment} alt="attachment" width={240} />}
            <span>{tweetObj.text}</span>
            {isOwner && (
              <>
                <button onClick={toggleEditing}>Edit</button>
                <button onClick={onDeleteClick}>Delete</button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Tweet;
