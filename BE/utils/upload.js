const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Kiểm tra và tạo thư mục nếu chưa tồn tại
const createUploadFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// Cấu hình lưu ảnh Tour
const tourStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "./uploads/tourImage/");
    createUploadFolder(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Cấu hình lưu ảnh Avatar (User)
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "./uploads/avatars/");
    createUploadFolder(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadTourImage = multer({ storage: tourStorage });
const uploadAvatar = multer({ storage: avatarStorage });

module.exports = { uploadTourImage, uploadAvatar };
