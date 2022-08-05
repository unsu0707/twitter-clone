import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService, storageService } from "firebaseInstance";
import React from "react";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = React.useState([]);

  React.useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTweets(tweets);
      });
  }, []);

  console.log(tweets);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={userObj.uid === tweet.creatorId} />
        ))}
      </div>
    </div>
  );
};
export default Home;
