const mongoose = require('mongoose')


let connectionString = "mongodb://localhost:27017/userInfo";

mongoose.connect(connectionString)

module.exports = mongoose
