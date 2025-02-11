const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./models"); // Import Sequelize models
const authRoutes = require("./routes/authRoutes.js");
const tourRoutes = require("./routes/tour.route.js");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tour", tourRoutes);
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});



db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully");
});
