import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { addUserName, deleteMessage, updated } from "./feature/chatSlice";

function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const { message, userName } = useSelector((state) => state.chat.user);
  console.log(userName, message);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("send-username", (userName) => {
      dispatch(addUserName(userName));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on("recive-message", (message) => {
      dispatch(updated(message));
    });

    socket.on("delete-message-form-others", (messageId) => {
      dispatch(messageId);
    });

    return () => {
      socket.off("recive-message");
      socket.off("delete-message-form-others");
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const message = {
        text: messageInput,
        id: Date.now(),
        isSender: true,
        userName,
      };
      socket.emit("send-message", message);
      dispatch(updated(message));
      setMessageInput("");
    }
  };

  const handleDelete = (id) => {
    socket.emit("delete-message", id);
    dispatch(deleteMessage(id));
  };

  return (
    <>
      <header className="flex justify-center items-center">
        <h1 className="from-neutral-700">{userName}</h1>
      </header>
      <main className="container p-4 ">
        <div className="border border-solid rounded h-96 overflow-y-scroll ">
          {message.map((msg) => (
            <div key={msg.id} className="flex mx-4">
              {msg.isSender && (
                <button onClick={() => handleDelete(msg.id)}>🗑️</button>
              )}
              <p
                className={`border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent ${
                  msg.isSender && "text-blue-700"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <div className="flex justify-center items-center">
          <input
            className="border w-3/4 p-2 rounded-lg"
            type="text"
            name=""
            id=""
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            type="button"
            className="border bg-blue-500 m-2 border-solid p-2 rounded-lg"
            onClick={sendMessage}
          >
            send
          </button>
        </div>
      </footer>
    </>
  );
}

export default Chat;
