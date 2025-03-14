const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authController.getProfile);

// Google login routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        console.log("User after Google login:", req.user); // 🔥 Debug
        res.redirect(`http://localhost:5173/google-success?token=${req.user.token}`);
    }
);

module.exports = router;
