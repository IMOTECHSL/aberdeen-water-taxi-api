const flightService = require("../services/flights.service");
const schema = require("../validations/schemas/flights/flight.validations");

//1 -> Get All Flights
exports.getAllFlights = async (req, res, next) => {
  try {
    const flights = await flightService.getAllFlights();
    return res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};

//2 -> Get Flight By ID
exports.getFlightByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await flightService.getFlightByID(id);
    if (!found) {
      return res.status(404).json({ status: "error", data: "Not Found" });
    }

    return res.status(200).json({ status: "success", data: found });
  } catch (error) {
    next(error);
  }
};

//3 -> Create New Flight
exports.createNewFlight = async (req, res, next) => {
  try {
    let errors = [];
    const { error } = schema.validate(req.body);

    if (error && error.details.length > 0) {
      errors = error.details.map((e) => {
        return {
          errMsg: e.message,
        };
      });

      return res.sendStatus(400);
    }

    const newFlight = {
      flightName: req.body.flightName.toString(),
      flightNumber: req.body.flightNumber.toString(),
    };
    let created = await flightService.createFlight(newFlight);
    if (created) {
      return res.status(201).json({ status: "success", data: created });
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

//4 -> Update Flight By ID
exports.updateFlightByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await flightService.getFlightByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    const updatedFlight = {
      flightName: req.body.flightName.toString(),
      flightNumber: req.body.flightNumber.toString(),
    };
    const updated = await flightService.updateFlightById(id, updatedFlight);
    return res.status(200).json({ status: "success", data: updated });
  } catch (error) {
    return res.sendStatus(500);
  }
};

//5 -> Delete Flight By ID
exports.deleteFlightByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await flightService.getFlightByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    await flightService.deleteFlightById(id);
    return res.status(204).json({ status: "success", data: [] });
  } catch (error) {
    return res.sendStatus(500);
  }
};
