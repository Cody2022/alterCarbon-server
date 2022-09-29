const projectRoutes = require("./routes/projectRoutes");
const express = require("express");
const app = express();
const path=require('path')

app.use(express.json())
app.use("/api",projectRoutes);
app.use(express.static(path.join(__dirname, 'public')));


const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);
