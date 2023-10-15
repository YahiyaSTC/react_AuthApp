import axios from "axios";

// const APIURL = "https://react-auth-app-for-vercel.vercel.app/"; // production
const APIURL = "http://localhost:8000/"; // development
let token;

export const registerUser = async (data) => {
  // console.log(data);
  try {
    let response = await axios.post(`${APIURL}register`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (data) => {
  // console.log(data);
  try {
    let response = await axios.post(`${APIURL}login`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSingleUser = async () => {
  token = localStorage.getItem("userCredentiials");
  try {
    let response = await axios.get(`${APIURL}user`, {
      headers: {
        jwt: token ? token : "",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
