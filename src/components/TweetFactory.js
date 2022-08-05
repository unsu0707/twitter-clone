import { dbService, storageService } from "firebaseInstance";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = React.useState("");
  const [attachment, setAttachment] = React.useState(null);
  const onSubmit = async (e) => {
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
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      {attachment && (
        <div>
          <img src={attachment} alt="preview" width="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
      <input type="submit" value="Post" />
    </form>
  );
};

export default TweetFactory;
