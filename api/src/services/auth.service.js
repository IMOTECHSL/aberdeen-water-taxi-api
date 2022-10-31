const jwt = require("jsonwebtoken");

const generateToken = async (config, user) => {
  return await jwt.sign(
    {
      sub: user._id,
      fullname: user.fullname,
      username: user.username,
      admin: user.userType === "admin" ? true : false,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.expiresIn,
      issuer: config.issuer,
      audience: config.audience,
      algorithm: "HS256",
    }
  );
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

module.exports = {
  verifyToken,
  generateToken,
};
