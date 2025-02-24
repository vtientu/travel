const multer = require("multer");
const path = require("path");

// Cấu hình lưu file vào thư mục uploads/avatars/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../BE/utils/uploads/avatars/"); // Thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Định dạng tên file
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
