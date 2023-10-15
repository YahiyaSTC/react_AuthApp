require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const configDB = require('./Config/db');

configDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", async(req,res)=>{
  res.redirect("https://amt-staffing-bdfb7.web.app/")
});
app.use("/", require("./Router/authRoute"));

app.listen(port, () => {
  console.log(`server listing on port ==> ${port}`);
});
