const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./models"); // Import Sequelize models
const routes = require("./routes/index.js"); // Import routes tổng hợp
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routes); // Gộp tất cả routes vào /api
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Khởi động server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

// Đồng bộ database
(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
})();
