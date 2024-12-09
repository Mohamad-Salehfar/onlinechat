import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { updated } from "./feature/chatSlice";
function App() {
  const [messageInput, setMessageInput] = useState("");
  const message = useSelector((state) => state.chat.message);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      dispatch(updated(message));
    });
  }, [dispatch]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const message = { text: messageInput, timeStamp: Date.now() };
      socket.emit("chatMessage", message);
      dispatch(updated(message));
      setMessageInput("");
    }
  };

  return (
    <>
      <header>
        <h1 className="font-bold">chat online</h1>
      </header>
      <body>
        {message.map((msg, index) => (
          <p key={index}>
            <strong>{new Date(msg.timestamp).toLocaleTimeString()}</strong>:{" "}
            {msg.text}
          </p>
        ))}
      </body>
      <footer>
        <input
          type="text"
          name=""
          id=""
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>send</button>
      </footer>
    </>
  );
}

export default App;
