const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authController.getProfile);

// Google login routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleLogin
);

router.post("/forgot-password", authController.sendResetCode);
router.post("/reset-password", authController.resetPassword);
router.post("/resend-reset-code", authController.resendResetCode);
module.exports = router;
