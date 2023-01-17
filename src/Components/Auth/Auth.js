import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import Cookies from "universal-cookie";
import googleimg from "../../Assets/googleDark.png";
import "../Auth/Auth.css";
const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={signInWithGoogle} class="signInButton">
        <img src={googleimg} />
        Sign In With Google
      </button>
    </div>
  );
};

export default Auth;
