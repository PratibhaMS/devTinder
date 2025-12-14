const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pratibhamsawant0613_db_user:uaex781A2SHQ7d1R@cluster0.h75u23j.mongodb.net/divtinder"
  );
};

// connectDB()
//   .then(() => {
//     console.log("database connection establish");
//   })
//   .catch((err) => {
//     console.log("database cannot be connected");
//   });

module.exports = connectDB;
