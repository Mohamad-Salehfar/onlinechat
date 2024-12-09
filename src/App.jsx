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
      <header className="flex justify-center items-center">
        <h1 className="from-neutral-700">chat online</h1>
      </header>
      <main className="container p-4 ">
        <div className="border border-solid rounded h-96 overflow-y-scroll">
          {/* {messages.map((msg, index) => (
            <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent" key={index}>
              <strong>{new Date(msg.timestamp).toLocaleTimeString()}</strong>:{" "}
              {msg.text}
            </p>
          ))} */}
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam illo
            labore ratione accusantium tempore placeat harum ab saepe aliquam
            eligendi impedit at itaque eveniet exercitationem, laboriosam a quis
            facilis sunt quidem eaque libero sed? Asperiores nesciunt temporibus
            doloribus voluptatem iste, itaque est possimus minima voluptatum
            maxime dolores natus sit impedit!
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
          <p className="border m-4 border-solid px-6 py-2 h-auto w-3/4 border-transparent">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            corrupti.
          </p>
        </div>
      </main>
      <footer>
        <form className="flex justify-center items-center">
          <input
            className="border w-3/4 p-2 rounded-lg"
            type="text"
            name=""
            id=""
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="border bg-blue-500 m-2 border-solid p-2 rounded-lg"
            onClick={sendMessage}
          >
            send
          </button>
        </form>
      </footer>
    </>
  );
}

export default App;
