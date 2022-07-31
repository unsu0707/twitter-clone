import { auth, firebaseInstance } from "firebaseInstance";
import React from "react";

const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newAccount, setNewAccount] = React.useState(true);
  const [error, setError] = React.useState("");
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

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onClickSocialLogin = async (e) => {
    const { name } = e.target;
    var provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const result = await auth.signInWithPopup(provider);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
        <button type="submit">{newAccount ? "Sign Up" : "Sign In"}</button>
        error : {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Already have an account?" : "Need an account?"}</span>
      <div>
        <button onClick={onClickSocialLogin} name="google">
          Continue with Google
        </button>
        <button onClick={onClickSocialLogin} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
