const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const { welcomePage, loadUserState, createUserState} = require ("./../model/functions.js")

const { carbonCalculation } = require('../model/carbonCalculation.js');
const bodyParser=require('body-parser')
const bcrypt = require('bcrypt');

router.use(bodyParser.json())


router.get("/welcome", (req,res) =>{
    let startMessage = welcomePage()
    res.send(startMessage)
} )

// router.get("/userInfo", async(req,res) =>{
//     let userId = req.query.userId
//     let loadedUserState = await loadUserState(userId)
//     res.send(loadedUserState)
// } )

// router.get("/user", async(req,res) =>{
//     let userName = req.query.userName
//     let responseMessage = await createUserState(userName)
//     res.send(responseMessage)
// } )



// router.post("/createUser", async(req,res) =>{
//     console.log(req.body)
//     // let userId = req.query.userId
//     // let loadedUserState = await loadUserState(userId)
//     // res.send(loadedUserState)
//     res.send(req.body)
// } )

//*** Cody added the following section*/
router.post("/login", (req, res) => {
    console.log((user = req.body.username));
    console.log((password = req.body.password));
    // connect with DB to check passwword and then send token to client
    if (password === "123456") {
      res.send({
        token: 'successful',
      });
    }else {
      res.send({Message: "Wrong email or password"})
    };
   
  });


router.post("/carbon", async (req,res)=>{
    const carbonEmission=await carbonCalculation(req.body)
    res.send(carbonEmission)
})

router.post("/register", async (req,res)=>{
    console.log("req.body is", req.body)
    const {username,password}=req.body;
    //if email is not found in the database, hash password and save account to database
    //else return "email" has been registered
    
    const hash=await bcrypt.hash(password, saltRounds=10);
    //Save hash to database
    res.json(hash);
})

/* ---------*/


module.exports = router