import React from "react";

const Home = () => {
  const [message, setMessage] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  return (
    <div>
      <form>
        <input value={message} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
};
export default Home;
