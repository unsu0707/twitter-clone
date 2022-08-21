import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="tweet">
      {editing ? (
        <>
          <form onSubmit={onEditSubmit} className="container tweetEdit">
            <input value={newTweet} onChange={onChange} type="text" maxLength={120} autoFocus className="formInput" />
            <input type="submit" value="Update" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          <div>
            {tweetObj.attachment && <img src={tweetObj.attachment} alt="" />}
            {isOwner && (
              <div className="tweet__actions">
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tweet;
