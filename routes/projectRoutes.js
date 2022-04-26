require("dotenv").config();
const weatherAPI = process.env.weatherAPIKey;
const debug = require("debug")("server:projectRoutes");

const axios = require("axios");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const { createUser, findByName,addRecordByName } = require("../model/userModel");
const { carbonCalculation } = require("../model/carbonCalculation.js");
const res = require("express/lib/response");

router.use(bodyParser.json());

//*** Cody added the following section*/
router.post("/login", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  if (user === undefined || password === undefined) {
    return res.send({
      status: "noInput",
      id: user,
      message: "Enter username and password please",
    });
  }
  const userInfo = await findByName({ userName: user });
  if (userInfo === null) {
    res.send({
      status: "notSignup",
      id: user,
      message: "New user, Signup first please",
    });
  } else {
    const result = await bcrypt.compare(password, userInfo.password);
    if (result === true) {
      res.send({
        status: "successful",
        id: user,
        message: "Welcome",
      });
    } else {
      res.send({
        status: "failed",
        id: user,
        message: "Wrong username or password",
      });
    }
  }
});

router.post("/signup", async (req, res) => {
  const { user, passw } = req.body;

  const existingUser = await findByName({ userName: user });

  if (existingUser) {
    return res.send({
      status: "userexists",
      id: user,
      message: "Username already taken! Please signup with a different name",
    });
  } 
   else if (user && passw){
    
    const passwordHash = await bcrypt.hash(passw, (saltRounds = 10));
    const createdUserState = createUser({
      userName: user,
      password: passwordHash,
    });

    res.send({
      status: "signupsuccess",
      id: user,
      message: "Success, Thanks for signing up!",
    });
  }
  else {
    return res.send({
      status: "noInput",
      id: user,
      message: "Enter username and a password",
    });
};
});

router.post("/history", async (req, res) => {
  const user = req.body.user;
  console.log("user:", user);
  const userInfo = await findByName({ userName: user });
  const { electricity, naturalGas, carMiles, plasticWaste, water, food } =
    userInfo;
  debug("UserInfo:", userInfo);
  res.send({ electricity, naturalGas, carMiles, plasticWaste, water, food });
});
router.post("/history", async (req,res) => {
  try{
    const user = req.body.user
    console.log("user:", user)
    const userInfo=await findByName({userName:user})
    const {records} = userInfo;
    // debug("UserInfo:",userInfo) 
    res.send(records)
  }catch(error){
    res.status(500).send("Error in fetching records")
  }
})

router.post("/map", )

router.post("/carbon", async (req, res) => {
  const carbonEmission = await carbonCalculation(req.body);
  res.send(carbonEmission);
});


router.post("/weather", async(req,res)=>{
    const city=req.body.cityName;
    try {
      let response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPI}`);
      let weatherData=response.data
      // debug(weatherData)
      res.send(weatherData);
   }catch(err){
     debug("Error", err.response.data)
     res.status(500).send(err.response.data)
   }
})

router.post("/save", async(req, res)=>{
  try{
    const userName=req.body.userName;
    const record=req.body.record;
    // debug("userName is:", userName);
    // debug("record type is:", typeof (record));
    const resultsSaved=await addRecordByName(userName, record);
    res.status(200).send(resultsSaved);
  }catch(error){
    res.status(500).send("Error when saving record")
  }
})

/* ---------*/

module.exports = router;
