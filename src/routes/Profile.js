import Tweet from "components/Tweet";
import { auth, dbService } from "firebaseInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUserObj }) => {
  const navigate = useNavigate();
  const [myTweets, setMyTweets] = React.useState([]);
  const [newDisplayName, setNewDisplayName] = React.useState("");

  React.useEffect(() => {
    //get tweets made by userObj.uid from db
    dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMyTweets(tweets);
      });
  }, [userObj.uid]);

  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUserObj();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display Name"
          value={newDisplayName}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10 }} />
      </form>
      {userObj && (
        <>
          <h1>{userObj.uid}</h1>
          {myTweets.map((tweet) => (
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={userObj.uid === tweet.creatorId} />
          ))}
        </>
      )}
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
