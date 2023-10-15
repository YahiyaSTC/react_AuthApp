import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../apis/authAPi";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [log, setLog] = useState(false);
  const [login, setLogin] = useState({
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
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const saveForm = async (e) => {
    e.preventDefault();
    setLog(true);
    let response = await loginUser(login);
    // console.log(response);
    if (response && response.status) {
    if (!response.data.status) {
        setLog(false);
        toast.error(response.data.mess, options);
      } 
      else {
        navigate("/profile");
        localStorage.setItem("userCredentiials", response.data.token);
        toast.success(response.data.mess, options);
      }
    } 
    else {
      setLog(false);
      if(response.message === "Request failed with status code 404" || response.message === "Network Error" ){
        toast.error("Server Error Please try Again", options);
      }else{
        toast.error("Invalid Credentials", options);
      }
    }
  };

  return (
    <main className="auth_form">
      <div className="cent">
        <div className="alert">Login</div>
        <form onSubmit={saveForm}>
          <div className="group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={login.email}
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
              value={login.password}
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
          <div className="remember_" style={{display: "none"}}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          {log ? <p>Loadding.....</p> : <button type="submit">Login</button>}

          <div className="parah">
            If you dont have an Account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
