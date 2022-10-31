const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/awt_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = dbConnection;
