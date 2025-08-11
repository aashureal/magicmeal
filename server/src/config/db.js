const mongoose = require("mongoose");
const connectTodatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Conneced");
    })
    .catch((error) => {
      console.log("Database Error:", error);
    });
};

module.exports = connectTodatabase;
