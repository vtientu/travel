import { useEffect, useState } from "react";
import CalendarTravelTour from "../../components/sn-travel-guide-tour/CalendarTravelTour";
import StaticSection from "../../components/sn-dashboard/StaticSection";
import LayoutManagement from "../../layouts/LayoutManagement";
import { getGuideTourByUserId } from "../../services/API/guide-tour.service";
import Feedback from "../../components/sn-dashboard/Feedback";

const Dashboard = () => {
  const [travelTours, setTravelTours] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const DEFAULT_FEEDBACKS = [
    {
      id: 1,
      tour_name: "Tour 1",
      time: "2024-01-01",
      content: "Nội dung đánh giá",
      rating: 5,
      status: "Chưa xử lý",
    },
    {
      id: 2,
      tour_name: "Tour 2",
      time: "2024-01-02",
      content: "Nội dung đánh giá",
      rating: 4,
      status: "Đã xử lý",
    },
    {
      id: 3,
      tour_name: "Tour 3",
      time: "2024-01-03",
      content: "Nội dung đánh giá",
      rating: 3,
      status: "Chưa xử lý",
    },
    {
      id: 4,
      tour_name: "Tour 4",
      time: "2024-01-04",
      content: "Nội dung đánh giá",
      rating: 2,
      status: "Đã xử lý",
    },
    {
      id: 5,
      tour_name: "Tour 5",
      time: "2024-01-05",
      content: "Nội dung đánh giá",
      rating: 1,
      status: "Chưa xử lý",
    },
  ];

  useEffect(() => {
    // Sau khi đăng nhập lưu user info ở đâu thì get ra rồi truyền user id vào đây
    // const userId = localStorage.getItem("userId");

    const fetchTravelTours = async () => {
      try {
        const response = await getGuideTourByUserId(1);

        if (response.data) {
          setTravelTours(response.data.items);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTravelTours();

    return () => {
      setTravelTours([]);
    };
  }, []);

  return (
    <LayoutManagement>
      <div className="h-full w-full p-5 gap-5 flex flex-col">
        <StaticSection />
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Thống kê chi tiết</h3>
          <CalendarTravelTour travelTours={travelTours} />
        </div>
        <Feedback feedbacks={DEFAULT_FEEDBACKS} />
        <div className="border-b border-gray-200" />
      </div>
    </LayoutManagement>
  );
};

export default Dashboard;
