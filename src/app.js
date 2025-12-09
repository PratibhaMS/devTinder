// starting file of the application
// console.log("Starting file");
// require means referancing
const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the server !");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
