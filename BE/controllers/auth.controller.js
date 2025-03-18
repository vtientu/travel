const jwt = require("jsonwebtoken");
const { User, Role, Customer } = require("../models");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "Người dùng đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role_id: 1,
    });

    return res.status(201).json({ message: "Tạo tài khoản thành công!", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Xảy ra lỗi khi đăng ký, vui lòng thử lại sau !", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập tài khoản hoặc mật khẩu!" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      return res.status(200).json({
        id: existingUser.id,
        email: existingUser.email,
        role_id: existingUser.role_id,
        access_token: generateAccessToken(existingUser.id),
      });
    } else {
      return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xử lý xác thực Google
const googleAuth = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });

    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        googleId: profile.id,
        avatar: profile.photos?.[0]?.value || "",
        displayName: profile.displayName,
        givenName: profile.name?.givenName || "",
        familyName: profile.name?.familyName || "",
        role_id: 1, // Mặc định là customer
      });

      // Kiểm tra xem Customer đã tồn tại chưa
      let customer = await Customer.findOne({ where: { user_id: user.id } });

      if (!customer) {
        await Customer.create({
          user_id: user.id,
          first_name: profile.name?.givenName || "",
          last_name: profile.name?.familyName || "",
          number_phone: profile?.phoneNumber || "",
        });
      } else {
        // Cập nhật lại thông tin Customer nếu có thay đổi
        await customer.update({
          first_name: profile.name?.givenName || customer.first_name,
          last_name: profile.name?.familyName || customer.last_name,
        });
      }
    }

      return done(null, user);
    } catch (error) {
      console.error("Lỗi trong googleAuth:", error);
      return done(error, null);
    }
  };


  const googleLogin = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const user = await User.findOne({ where: { id: req.user.id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let customer = await Customer.findOne({ where: { user_id: user.id } });

    if (!customer) {
      customer = await Customer.create({
        user_id: user.id,
        first_name: req.user.displayName || "",
        last_name: req.user.family_name || "",
        number_phone: "",
      });
    }

      const token = generateAccessToken(user.id);

      return res.redirect(
        `http://localhost:5173/auth/callback?token=${token}&id=${user.id}&email=${encodeURIComponent(user.email)}&avatar=${encodeURIComponent(user.avatar || '')}`
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const getProfile = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        where: { id: decoded.id },
        include: { model: Role, as: "role", attributes: ["id", "role_name"] },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        role_id: user.role_id,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    register,
    login,
    googleAuth,
    googleLogin,
    getProfile,
  };
