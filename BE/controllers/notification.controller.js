const db = require("../models");
const Notification = db.Notification;
const NotificationType = db.NotificationType;
const User = db.User;
const Booking = db.Booking;

// Lấy tất cả thông báo của người dùng
exports.getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Lấy tất cả thông báo của người dùng
    const notifications = await Notification.findAll({
      where: { user_id: userId },
      include: [
        {
          model: NotificationType,
          as: "type",
        },
      ],
    });

    if (notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this user" });
    }

    res.status(200).json({
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

// Tạo thông báo khi có booking
exports.createNotificationForBooking = async (req, res) => {
  try {
    const { user_id, booking_id, type_id, send_date, message } = req.body;

    // Kiểm tra xem user và booking có tồn tại không
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const booking = await Booking.findByPk(booking_id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    // Kiểm tra NotificationType có tồn tại không
    const notificationType = await NotificationType.findByPk(type_id);
    if (!notificationType) {
      return res.status(404).json({ message: "NotificationType not found!" });
    }

    // Tạo thông báo
    const newNotification = await Notification.create({
      user_id,
      booking_id,
      type_id,
      send_date,
      message,
    });

    res.status(201).json({
      message: "Notification created successfully!",
      data: newNotification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating notification",
      error: error.message,
    });
  }
};

// Xóa thông báo theo ID
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found!" });
    }

    await notification.destroy();

    res.status(200).json({
      message: "Notification deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting notification",
      error: error.message,
    });
  }
};
