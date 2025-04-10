const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");
const {authenticateUser, authenticateAdmin} = require("../middleware/authMiddleware");

// Tạo topic mới
router.post("/create",
    // authenticateUser, 
    // authenticateAdmin,
    topicController.createTopic);

// Lấy danh sách tất cả topic
router.get("/", topicController.getAllTopics);

// Lấy thông tin topic theo ID
router.get("/:id", topicController.getTopicById);

// Cập nhật thông tin topic
router.put("/:id",
    // authenticateUser,
    // authenticateAdmin,
    topicController.updateTopic);

// Xóa topic    
router.delete("/:id",
    // authenticateUser,
    // authenticateAdmin,
    topicController.deleteTopic);

router.post("/add-tour", topicController.addTourToTopic);

module.exports = router; 