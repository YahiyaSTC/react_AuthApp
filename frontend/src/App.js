import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login, Register } from "./Auth/index";
import Profile from "./Profile/profile";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
