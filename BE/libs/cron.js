const cron = require("node-cron");
const { Op, Sequelize } = require("sequelize");
const { TravelTour, DiscountService, ProgramDiscount } = require("../models");

const applyLastMinuteDiscount = () => {
  // Chạy 12 giờ 1 lần
  cron.schedule("0 */12 * * *", async () => {
    try {
      console.log("🔁 Running last-minute discount job...");

      const now = new Date();
      const threeDaysFromNow = new Date(
        now.getTime() + 3 * 24 * 60 * 60 * 1000
      );

      // Tìm các tour bắt đầu trong 3 ngày tới và chưa có dịch vụ giảm giá
      const tours = await TravelTour.findAll({
        where: {
          start_day: {
            [Op.gte]: now,
            [Op.lte]: threeDaysFromNow,
          },
          current_people: {
            [Op.lt]: Sequelize.literal("max_people"), // so sánh current_people với max_people
          },
        },
      });

      const programDiscounts = await ProgramDiscount.findOne();

      await Promise.all(
        tours.map(async (tour) => {
          // Kiểm tra xem tour đã có dịch vụ giảm giá hay chưa
          const existingDiscount = await DiscountService.findOne({
            where: { travel_tour_id: tour.id },
          });

          if (!existingDiscount) {
            // Nếu chưa có dịch vụ giảm giá, thêm mới
            await DiscountService.create({
              travel_tour_id: tour.id,
              program_discount_id: programDiscounts.id,
            });
            console.log(`Applied discount to tour ${tour.id}`);
          }
        })
      );

      console.log("🔁 Last-minute discount job completed");
    } catch (error) {
      console.error("🚨 Error running last-minute discount job:", error);
    }
  });
};

module.exports = { applyLastMinuteDiscount };
