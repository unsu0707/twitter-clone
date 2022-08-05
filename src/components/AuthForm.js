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
      <span onClick={toggleAccount}>{newAccount ? "Already have an account?" : "Need an account?"}</span>

      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
        <button type="submit">{newAccount ? "Sign Up" : "Sign In"}</button>
        error : {error}
      </form>
    </>
  );
};

export default AuthForm;
