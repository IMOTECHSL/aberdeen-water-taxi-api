const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");

const generateQR = async (uid) => {
  try {
    const err = await qrcode.toFile(
      path.join(__dirname, `../public/images/qr/${uid}.jpg`),
      uid
    );
    if (err) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteQR = async (file) => {
  try {
    fs.unlink(file, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
};
const getFullUrl = async (req) => {
  return req.protocol + "://" + req.get("host") + req.originalUrl;
};

module.exports = {
  generateQR,
  deleteQR,
  getFullUrl
};
