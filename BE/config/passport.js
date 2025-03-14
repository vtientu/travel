const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value || null,
          password: null,
          role_id: 1,
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, { id: user.id, token: user.token });
});

passport.deserializeUser(async (userData, done) => {
  try {
    const user = await User.findByPk(userData.id);
    user.token = userData.token; // Gán lại token từ session
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
