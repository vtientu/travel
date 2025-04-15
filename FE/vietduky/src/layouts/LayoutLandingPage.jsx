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
import Slider from "react-slick"; // Import the slider component
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />

      <SearchTour />

      {/* Image Slider */}
      <div className="p-6 relative w-4/5 mx-auto">
        <Slider {...settings}>
          <div>
            <img
              src="/Image/poster.jpeg.svg"
              alt="Khuyến mãi 1"
              className="rounded-lg pointer-events-none w-full h-auto"
            />
          </div>
          <div>
            <img
              src="/Image/poster.jpeg.svg"
              alt="Khuyến mãi 2"
              className="rounded-lg pointer-events-none w-full h-auto"
            />
          </div>
          <div>
            <img
              src="/Image/poster.jpeg.svg"
              alt="Khuyến mãi 3"
              className="rounded-lg pointer-events-none w-full h-auto"
            />
          </div>
        </Slider>
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

      {/* Topic Tour */}
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

      {/* Khám phá địa điểm vui chơi ở Việt Nam */}
      <LocationVN />

      {/* Footer */}
      <Footer />
    </div>
  );
}