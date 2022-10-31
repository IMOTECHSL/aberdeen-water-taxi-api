const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");

const generateQR = async (uid) => {
  try {
    const err = await qrcode.toFile(
      path.join(__dirname, `../public/qrcodes/${uid}.png`),
      uid
    );
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteQR = async (file) => {
  try {
    fs.unlink(file, (err) => {
      if (err) throw err;
      console.log("File Deleted");
    });
  } catch (error) {}
};

module.exports = {
  generateQR,
};
