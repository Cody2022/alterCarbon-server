const userInfo = {
    userName : "",
    electricity : 0,
    naturalGas : 0,
    carMiles : 0,
    plasticWaste : 0
}

function welcome (req, res){
    res.send("Welcome" )
}

function inputs(req,res){
    res.sendFile(path.join(__dirname,'.alterCarbon/index.html'));
}

module.exports = {welcome,inputs}