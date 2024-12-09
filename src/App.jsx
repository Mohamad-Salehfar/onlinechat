import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { updated } from "./feature/chatSlice";
function App() {
  const [messageInput, setMessageInput] = useState("");
  const messages = useSelector((state) => state.chat.message);
  const dispatch = useDispatch();

  console.log(messages);
  useEffect(() => {
    socket.on("recive-message", (message) => {
      dispatch(updated(message));
    });
  }, [dispatch]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const message = {
        text: messageInput,
        timeStamp: Date.now(),
        isSender: true,
      };
      socket.emit("send-message", message);
      dispatch(updated(message));
      setMessageInput("");
    }
  };

  return (
    <>
      <header>
        <h1 className="font-bold">chat online</h1>
      </header>

      {/* Pooooooofiusessssssssssssssssssssss body che anyie?????????????????? */}
      {/* ye taghir to message hat dadam ye sender behesh ezafe kardam ba ien mitoni class css bdi va payame khodet ro az payam ion joda koni */}
      <body></body>

      <main>
        {/* {message.map((msg, index) => (
          <p key={index}>
            <strong>{new Date(msg.timestamp).toLocaleTimeString()}</strong>:{" "}
            {msg.text}
          </p>
        ))} */}
      </main>
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
