const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const { welcomePage, loadUserState, createUserState} = require ("./../model/functions.js")



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

module.exports = router