const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");

// Tạo topic mới
router.post("/create", topicController.createTopic);

// Lấy danh sách tất cả topic
router.get("/", topicController.getAllTopics);

// Lấy thông tin topic theo ID
router.get("/:id", topicController.getTopicById);

// Cập nhật thông tin topic
router.put("/:id", topicController.updateTopic);

// Xóa topic    
router.delete("/:id", topicController.deleteTopic);

module.exports = router; 