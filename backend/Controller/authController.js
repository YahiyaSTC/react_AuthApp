const auth = require("../Model/authModel");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  // console.log(req.body);

  let { email, password } = req.body;

  if (email === "") {
    res.json({ mess: "Email Field is Empty" });
  } else if (password === "") {
    res.json({ mess: "Password Field is Empty", status: false });
  } else if (password.length < 6) {
    res.json({ mess: "Password should be 6 character or more", status: false });
  } else {
    let data = await auth.find({ email });
    // console.log(data);
    if (data.length === 0) {
      res.json({ mess: `user not found`, status: false });
    } else {
      if(data[0].password === password){
        res.json({
          mess: `${data[0]?.username} found successFully`,
          status: true,
          token: getToken(data[0]?._id),
        });
      }else{
        res.json({ mess: `Incorrect Password`, status: false });
      }
     
    }
  }
};
const registerUser = async (req, res) => {
  // console.log(req.body);

  let { email, password } = req.body;

  if (email === "") {
    res.json({ mess: "Email Field is Empty", status: false });
  } else if (password === "") {
    res.json({ mess: "Password Field is Empty", status: false });
  } else if (password.length < 6) {
    res.json({ mess: "Password should be 6 character or more", status: false });
  } else {
    let data = await auth.find({ email });
    if (data.length === 0) {
      let findUser = await auth.create(req.body);
      res.json({
        mess: `${findUser.username} created SuccessFully`,
        status: true,
      });
    } else {
      res.json({ mess: "already created", status: false });
    }
  }
};

const getUser = async (req, res) => {
  let reqq = req.headers;
  let id = reqq.id;

  const data = await auth.findById(id);

  await delete reqq.id;

  res.json({
    mess: { username: data.username, email: data.email },
    status: true,
  });
};

const getToken = (id) => {
  const tokenKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id }, tokenKey, { expiresIn: "10s" });
};

module.exports = { loginUser, registerUser, getUser };
