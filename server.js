const express = require('express');
const res = require('express/lib/response');
const app = express();
const {welcome,inputs} = require('./functions')

let userName
let electricity
let naturalGas
let carMiles
let plasticWaste

app.get("/", welcome)

app.get("/userInfo", (req,res)=>{
  res.sendFile('./index.html', {'root':"C:/Programming/alterCarbon"});
})

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);

