import Tweet from "components/Tweet";
import { auth, dbService } from "firebaseInstance";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUserObj }) => {
  const history = useHistory();
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
    history.push("/");
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
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName} />
        <input type="submit" value="Update" />
      </form>
      {userObj && (
        <>
          <h1>{userObj.uid}</h1>
          {myTweets.map((tweet) => (
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={userObj.uid === tweet.creatorId} />
          ))}
        </>
      )}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
