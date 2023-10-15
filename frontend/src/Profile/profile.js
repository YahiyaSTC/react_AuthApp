import React, { useEffect, useState } from "react";
import profilePic from "../assets/profile.png";
import { getSingleUser } from "../apis/authAPi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {
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
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("userCredentiials");
    toast.success("Logout Successfull", options);
    navigate("/");
  };

  const getUserData = async () => {
    let response = await getSingleUser();
    if (response && response.status) {
      if (!response.data.status) {
        navigate("/");
        toast.error(response.data.message, options);
      } else {
        toast.success(response.data.mess, options);
        setUser(response.data.mess);
      }
    } else {
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

  useEffect(() => {
    if (localStorage.getItem("userCredentiials")) {
      if (
        localStorage.getItem("userCredentiials") === "" ||
        localStorage.getItem("userCredentiials") === undefined
      ) {
        navigate("/");
      } else {
        getUserData();
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main className="profile_page">
      <div className="card">
        <div className="imgg">
          <img src={profilePic} alt="profileImage" />
        </div>
        <div className="text">
          <span>
            <b> Username:</b> {!user ? "...." : user.username}
          </span>
          <span>
            <b> Email:</b> {!user ? "...." : user.email}
          </span>
          <span>
            <b> Password:</b> {!user ? "...." : "***************"}
          </span>
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
