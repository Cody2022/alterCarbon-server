const projectRoutes = require("./routes/projectRoutes");
const express = require("express");
const app = express();

app.use(express.json())
app.use("/api",projectRoutes);


const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);
