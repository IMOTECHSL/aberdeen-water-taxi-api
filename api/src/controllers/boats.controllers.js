const boatService = require("../services/boats.service");
const schema = require("../validations/schemas/boats/boat.validations");

//1 -> Get All Boats
exports.getAllBoats = async (req, res, next) => {
  try {
    const boats = await boatService.getAllBoats();
    return res.status(200).json({ status: "success", data: boats });
  } catch (error) {
    return res.sendStatus(500);
  }
};

//2 -> Get Boat By ID
exports.getBoatByID = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await boatService.getBoatByID(id);
    if (!found) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ status: "success", data: found });
  } catch (error) {
    return res.sendStatus(500);
  }
};

//3 -> Create New Boat
exports.createNewBoat = async (req, res, next) => {
  try {
    let errors = [];
    const { error } = schema.validate(req.body);

    if (error && error.details.length > 0) {
      errors = error.details.map((e) => {
        return {
          errMsg: e.message,
        };
      });

      return res.status(400).json({ status: "error", data: errors });
    }

    const newBoat = {
      ...req.body,
    };

    let created = await boatService.createBoat(newBoat);
    if (created) {
      return res.status(201).json({ status: "success", data: created });
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

//4 -> Update Boat By ID
exports.updateBoatByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const found = await boatService.getBoatByID(id);
    if (!found) {
      return res.sendStatus(404);
    }
    const updatedBoat = {
      ...req.body,
    };
    const updated = await boatService.updateBoatById(id, updatedBoat);
    return res.status(200).json({ status: "success", data: updated });
  } catch (error) {
    return res.sendStatus(500);
  }
};

//5 -> Delete Boat By ID
exports.deleteBoatByID = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (typeof id === "undefined") {
      return res.sendStatus(400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const exist = await boatService.getBoatByID(id);
    if (!exist) {
      return res.sendStatus(404);
    }
    const deleted = await boatService.deleteBoatById(id);
    return res.status(204).json({ status: "success", data: deleted });
  } catch (error) {
    return res.sendStatus(500);
  }
};
