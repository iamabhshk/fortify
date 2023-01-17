import { useRef } from "react";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Cookies from "universal-cookie";
import Chat from "./Components/Chat/Chat";
import { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Heading from "./Components/Heading/Heading";
import Homepage from "./Components/Homepage/Homepage";
import EyeCursor from "./Components/EyeCursor/EyeCursor";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("  ");
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-toke");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="mainPage">
        <Homepage />
        <div className="mainPage-auth">
          <Heading />
          <Auth setIsAuth={setIsAuth} />
        </div>
      </div>
    );
  }

  const eyeball = (event) => {
    const eye = document.querySelectorAll(".eyes");
    eye.forEach(function (eye) {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rotate = radian * (180 / Math.PI) * -1 + 270;
      eye.style.transform = "rotate(" + rotate + "deg)";
    });
  };

  return (
    <div onMouseMove={eyeball}>
      {room ? (
        <Chat setRoom={setRoom} room={room} />
      ) : (
        <div className="selectRoom">
          <div className="selectRoom-user">
            <h1 className="selectRoom-user-heading">
              Welcome to fortify <br /> {auth.currentUser.displayName}
            </h1>
            <EyeCursor className="selectRoom-eyeCursor" />
          </div>
          <div className="selectRoom-room">
            <form method="post" className="formname">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter room number"
                ref={roomInputRef}
                className="input"
              />

              <div
                id="button"
                onClick={() => setRoom(roomInputRef.current.value)}
              >
                <input type="submit" value="Enter" />
                <span className="rip1"></span>
                <span className="rip2"></span>
              </div>
              <div id="button" onClick={signUserOut}>
                <input className="signOut" value="Sign Out" />
                <span className="rip1"></span>
                <span className="rip2"></span>
              </div>
            </form>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default App;
