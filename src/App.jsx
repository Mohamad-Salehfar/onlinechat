import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Chat from "./Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
