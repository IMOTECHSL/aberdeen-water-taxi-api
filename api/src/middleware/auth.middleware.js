const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const authorization = req.headers["authorization"].split(" ")[0];
      const token = req.headers["authorization"].split(" ")[1];
      if (authorization !== "Bearer") return res.sendStatus(400);

      if (!token) return res.sendStatus(401);

      const decoded = await jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {}
      );

      //todo check if the issuer is valid
      req.user = {
        id: decoded.sub,
        admin: decoded.admin,
      };
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    if (err.message === "jwt expired") {
      return res.sendStatus(401);
    }
    res.sendStatus(400);
  }
};

const requireUser = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const authorization = req.headers["authorization"].split(" ")[0];
      const token = req.headers["authorization"].split(" ")[1];
      if (authorization !== "Bearer") return res.sendStatus(400);

      if (!token) return res.sendStatus(400);

      const decoded = await jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {}
      );

      //todo check if the issuer is valid
      req.user = decoded;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  requireAuth,
};
