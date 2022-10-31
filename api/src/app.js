require("dotenv").config();
const express = require("express");
const dbConnection = require("./database/connect");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const compression = require("compression");

//routers
const boatRoutes = require("./routes/boats.routes");
const flightRoutes = require("./routes/flights.routes");
const reservationRoutes = require("./routes/reservations.routes");
const locationRoutes = require("./routes/locations.routes");
const airlineRoutes = require("./routes/airlines.routes");
const usersRoute = require("./routes/users.routes");
const authRoute = require("./routes/auth.routes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));
dbConnection();

//set public folder

const apiVersion = process.env.API_VERSION;
app.use(express.json());

app.use(`/api/${apiVersion}/boats`, boatRoutes);
app.use(`/api/${apiVersion}/flights`, flightRoutes);
app.use(`/api/${apiVersion}/reservations`, reservationRoutes);
app.use(`/api/${apiVersion}/locations`, locationRoutes);
app.use(`/api/${apiVersion}/airlines`, airlineRoutes);
app.use(`/api/${apiVersion}/users`, usersRoute);
app.use(`/api/${apiVersion}/auth`, authRoute);
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   next(err);
// });
app.use((req, res, err, next) => {
  console.log(err);
  if (err.code === 500) {
    return res.sendStatus(500);
  }
  if (err.code === 404) {
    return res.sendStatus(404);
  }
  console.log(err);

  next();
});

// const PORT = process.env.PORT || 3000;

// mongoose.connection.once("open", () => {
//   console.log("Connected to Database Succesfully");
//   app.listen(PORT, () => {
//     console.log(`Application Started on http://localhost:${PORT}`);
//   });
// });

module.exports = app;
