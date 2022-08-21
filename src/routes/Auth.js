import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="authContainer">
      <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ marginBottom: 30 }} />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onClickSocialLogin} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onClickSocialLogin} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
