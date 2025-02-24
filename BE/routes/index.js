const express = require("express");
const router = express.Router();
const TourRouter = require("./tour.route");
const TravelTourRouter = require("./travel_tour.route");
const LocationRouter = require("./location.route");
const ServiceRouter = require("./service.route");
const TourServiceRouter = require("./tour_service.route");
const UserRouter = require("./user.route");
const Customer = require("./customer.route");
const PaymentCardRouter = require("./paymentCard.route");
const NotificationRouter = require("./notification.route");
const PostExperienceRouter = require("./postExperience.route");
const FeedbackRouter = require("./feedback.route");

router.use("/tour", TourRouter);
router.use("/location", LocationRouter);
router.use("/service", ServiceRouter);
router.use("/tour-service", TourServiceRouter);
router.use("/travel-tour", TravelTourRouter);
router.use("/user", UserRouter);
router.use("/customer", Customer);
router.use("/payment-card", PaymentCardRouter);
router.use("/notification", NotificationRouter);
router.use("/post-experience", PostExperienceRouter);
router.use("/feedback", FeedbackRouter);

module.exports = router;
