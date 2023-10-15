import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../apis/authAPi";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [log, setLog] = useState(false);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const saveForm = async (e) => {
    e.preventDefault();
    setLog(true);
    let response = await registerUser(register);
    if (response && response.status) {
      if (!response.data.status) {
        setLog(false);
        toast.error(response.data.mess, options);
      } else {
        navigate("/");
        toast.success(response.data.mess, options);
      }
    } else {
      setLog(false);
      if (
        response.message === "Request failed with status code 404" ||
        response.message === "Network Error"
      ) {
        toast.error("Server Error Please try Again", options);
      } else {
        toast.error("Invalid Credentials", options);
      }
    }
  };

  return (
    <main className="auth_form">
      <div className="cent">
        <div className="alert">Register</div>
        <form onSubmit={saveForm}>
          <div className="group">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={register.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="group">
            <label>Password</label>
            <input
              type={showPass === false ? "password" : "type"}
              minLength="6"
              maxLength="30"
              name="password"
              value={register.password}
              onChange={handleChange}
              required
            />
            {showPass === false ? (
              <i
                className="fa-solid fa-eye-slash def"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              ></i>
            ) : (
              <i
                className="fa-sharp fa-solid fa-eye def"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              ></i>
            )}
          </div>
          {log ? <p>Loadding.....</p> : <button type="submit">Register</button>}

          <div className="parah">
            If you have already an Account? <Link to="/">Log In</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
