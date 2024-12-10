import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    socket.emit("get-username", name);
    navigate("/chat");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to the Chat!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Enter Chat
      </button>
    </div>
  );
}

export default Login;
