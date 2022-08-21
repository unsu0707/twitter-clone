import { auth } from "firebaseInstance";
import React from "react";

const AuthForm = () => {
  const [newAccount, setNewAccount] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      var result;
      if (newAccount) {
        console.log("new account");
        result = await auth.createUserWithEmailAndPassword(email, password);
      } else {
        result = await auth.signInWithEmailAndPassword(email, password);
      }
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <button type="submit" className="authInput authSubmit">
          {newAccount ? "Sign Up" : "Sign In"}
        </button>
        {error && <span className="authError">{error}</span>}
      </form>{" "}
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
