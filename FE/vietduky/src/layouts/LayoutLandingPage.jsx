import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ExpireTour from "../components/Landing/ExpireTour/ExpireTour.jsx";
import FeaturedTour from "../components/Landing/FeaturedTour.jsx";
import LocationVN from "../components/Landing/LocationVN.jsx";
import TopicTour from "../components/Landing/TopicTour.jsx";
import VacationTour from "../components/Landing/VacationTour.jsx";
import SearchTour from "../components/SearchTour/SearchTour";
import FavouriteTour from "@/components/Landing/FavouriteTour/FavouriteTour";
import PreferentialTour from "@/components/Landing/PreferentialTour/PreferentialTour";
import PromotionSection from "@/components/Landing/PromotionSection";
import TopTours from "@/components/Landing/TopTour/TopTour";

export default function LayoutLandingPage() {
  return (
    <div
      className="bg-white"
      style={{
        // backgroundImage: "url('/Image/Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
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
      <TopTours />

      {/* Chương trình khuyến mại */}
      {/* <PromotionSection /> */}

      {/* Tour ưu đãi đặc biệt */}
      <PreferentialTour />

      {/* Chương trình khuyến mại */}
      <ExpireTour />

      {/* Tour du lịch được yêu thích nhất */}
      <FavouriteTour />

      {/*Topic Tour*/}
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
