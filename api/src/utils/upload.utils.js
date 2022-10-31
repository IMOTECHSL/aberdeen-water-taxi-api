const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/qrcodes/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date()
        .toISOString()
        .replace("/:/g")}-${file.originalname.toLowerCase()}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const allowedExtension = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const allowedMimetypes = filetypes.test(file.mimetype);
  if (allowedExtension && allowedMimetypes) {
    return cb(null, validate);
  } else {
    cb(null, false);
  }
};

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = {
  fileUpload,
};
