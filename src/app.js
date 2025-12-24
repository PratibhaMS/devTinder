// require means referancing
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
/**
 * express.json():- it read json object from request and convert it in to javascript object and add
 * javascript object back to the request object in the body.
 */
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    // note always connect to database first then to port.
    console.log(`database connection establish`);
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log(`database cannot be connected`);
  });
