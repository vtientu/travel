import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ExpireTour from "../components/Landing/ExpireTour/ExpireTour.jsx";
import FeaturedTour from "../components/Landing/FeaturedTour.jsx";
import LocationVN from "../components/Landing/LocationVN.jsx";
import TopicTour from "../components/Landing/TopicTour/TopicTour.jsx";
import VacationTour from "../components/Landing/VacationTour.jsx";
import SearchTour from "../components/SearchTour/SearchTour";
import FavouriteTour from "@/components/Landing/FavouriteTour/FavouriteTour";
import PreferentialTour from "@/components/Landing/PreferentialTour/PreferentialTour";
import PromotionSection from "@/components/Landing/PromotionSection";
import TopTours from "@/components/Landing/TopTour/TopTour";
import { TopicService } from "@/services/API/topic.service";
import { TourService } from "@/services/API/tour.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LayoutLandingPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await TopicService.getTopic();
        setTopics(response.data.data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };
    fetchTopic();
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />

      <SearchTour />

      {/* Gói quà chào mừng cho người dùng! */}
      <div className="p-6 relative w-4/5 mx-auto">
        <img
          src="/Image/poster.jpeg.svg"
          alt="Khuyến mãi"
          width={1000}
          height={200}
          className="rounded-lg pointer-events-none w-full pb-8 pt-8"
        />
      </div>

      {/* Tour nổi bật */}
      {/* <TopTours /> */}

      {/* Chương trình khuyến mại */}
      {/* <PromotionSection /> */}

      {/* Tour ưu đãi đặc biệt */}
      {/* <PreferentialTour /> */}

      {/* Chương trình khuyến mại */}
      <ExpireTour />

      {/* Tour du lịch được yêu thích nhất */}
      {/* <FavouriteTour /> */}

      {/*Topic Tour*/}
      {topics.map(
        (topic, index) =>
          topic.active && (
            <div
              key={topic.id}
              className={`${index % 2 === 0 ? 'bg-[#FEEEC759]' : 'bg-white'}`}
            >
              <TopicTour topic={topic} />
            </div>
          )
      )}

      {/* Tour du lịch hành hương */}
      {/* <TopicTour /> */}

      {/* Tour du lịch nghỉ dưỡng */}
      {/* <TopicTour /> */}

      {/* Tour du lịch khám phá */}
      {/* <TopicTour /> */}

      {/* Tour du lịch trải nghiệm */}
      {/* <TopicTour /> */}

      {/*Vacation Tour*/}
      {/* <VacationTour /> */}

      {/* Tour trong nước nổi bật */}
      {/* <FeaturedTour /> */}

      {/* Khám phá địa điểm vui chơi ở Việt Nam */}
      <LocationVN />

      {/* Footer */}
      <Footer />
    </div>
  );
}
