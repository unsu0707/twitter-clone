import { dbService, storageService } from "firebaseInstance";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = React.useState("");
  const [attachment, setAttachment] = React.useState(null);
  const onSubmit = async (e) => {
    if (tweet === "") {
      return;
    }
    e.preventDefault();

    var url = "";

    if (attachment) {
      const ref = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await ref.putString(attachment, "data_url");
      console.log(response);

      url = await response.ref.getDownloadURL();
    }

    dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachment: url,
    });
    setTweet("");
    setAttachment(null);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };
  const onFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setAttachment(e.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          className="factoryInput_input"
        />
        <input type="submit" value="Post" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add Photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input type="file" accept="image/*" onChange={onFileChange} id="attach-file" style={{ opacity: 0 }} />
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} style={{ backgroundImage: attachment }} />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
