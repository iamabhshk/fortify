import React, { useEffect, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useState } from "react";
import "../Chat/Chat.css";

const Chat = (props) => {
  const { room, setRoom } = props;
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const leaveRoom = () => {
    setRoom(null);
  };

  return (
    <div class="BoxChat">
      <div class="BoxInfoUser">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6569/6569264.png"
          class="BoxInfoUser-image"
        />
        <p class="BoxInfoUser-room">Room: {room}</p>
      </div>
      <div className="BoxMessage">
        {messages.map((message) => {
          return (
            <div className="BoxMessage-speech">
              <div className="BoxMessage-content"></div>
              <p className="BoxMessage-message">
                {message.user.split(" ")[0]}: {message.text}
              </p>
              <div ref={dummy}></div>
            </div>
          );
        })}
      </div>
      <div class="BoxSend">
        <form onSubmit={handleSubmit} className="BoxSend-form">
          <input
            type="text"
            id="msgUser"
            placeholder="enter your text..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="BoxSend-input"
          />
          <button type="submit" className="BoxSend-Send">
            Send
          </button>
          <button type="submit" onClick={leaveRoom} className="BoxSend-leave">
            Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
