import AuthForm from "components/AuthForm";
import { auth, firebaseInstance } from "firebaseInstance";
import React from "react";

const Auth = () => {
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
      <AuthForm />
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
