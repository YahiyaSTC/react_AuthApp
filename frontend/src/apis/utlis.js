let token;

export const registerUser = async (data) => {
  return fetch("http://localhost:8000/register", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      let response = data.json();
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};

export const loginUser = async (data) => {
  return fetch("http://localhost:8000/login", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      let response = data.json();
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};

export const getSingleUser = async () => {
  token = localStorage.getItem("userCredentiials");
  return fetch("http://localhost:8000/user", {
    headers: {
      Accept: "application/json",
      jwt: token ? token : "",  
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      let response = data.json();
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};


// https://react-auth-app-for-vercel.vercel.app/