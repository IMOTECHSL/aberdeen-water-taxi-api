require("dotenv").config();
const mongoose = require("mongoose");
const dbConnection = require("./database/connect");
const app = require("./app");


// dbConnection();


const PORT = process.env.PORT || 3000;

mongoose.connection.once("open", () => {
  console.log("Connected to Database Succesfully");
  app.listen(PORT, () => {
    console.log(`Application Started on http://localhost:${PORT}`);
  });
});
