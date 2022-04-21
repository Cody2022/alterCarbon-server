require("dotenv").config();
const axios=require("axios");
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const {createUser,findByName} = require("../model/userModel")

const weatherAPI=process.env.weatherAPIKey;


const { carbonCalculation } = require("../model/carbonCalculation.js");


router.use(bodyParser.json());

//*** Cody added the following section*/
router.post("/login", async (req, res) => {
    const user = req.body.username;
    const password = req.body.password;

    const userInfo=await findByName({userName:user})
    // console.log("hash", hash)
    const result=await bcrypt.compare(password, userInfo.password);
    console.log("result is:", result)
  // connect with DB to check passwword and then send token to client
  if (result === true) {
    res.send({
      token: "successful",
    });
  } else {
    res.send({ Message: "Wrong email or password" });
  }
});

router.post("/signup", async (req, res) =>{
  const {user, passw}=req.body;
  const passwordHash=await bcrypt.hash(passw, saltRounds=10);
  
  const createdUserState =  createUser({userName:user, password:passwordHash});
  res.send(createdUserState)
  
})

router.post("/carbon", async (req, res) => {
  const carbonEmission = await carbonCalculation(req.body);
  res.send(carbonEmission);
});


router.post("/weather", async(req,res)=>{
    const city=req.body.cityName;
    try {
      let response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPI}`);
      let weatherData=response.data
      console.log(weatherData)
      res.send(weatherData);
   }catch(err){
     console.log("Error", err.response.data)
     res.status(500).send(err.response.data)
   }
})

/* ---------*/

module.exports = router;
