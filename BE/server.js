const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./models");
const routes = require("./routes/index.js");
const path = require("path");
const passport = require("./config/passport");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 5000;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
})();
