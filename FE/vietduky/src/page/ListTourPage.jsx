import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeaderCard from "@/components/ListTour/HeaderCard";
import SearchBar from "@/components/ListTour/SearchBar";
import TourFilter from "@/components/ListTour/TourFilter";
import TourCard from "@/components/TourCard/TourCard";

export default function ListTour() {
  return (
    <div
      className="bg-white"
      style={{
        backgroundImage: "url('/Image/Background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Header />
      <HeaderCard />
      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold bg-transparent text-gray-900 mb-4">
          Bộ lọc tìm kiếm
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Bộ lọc bên trái */}
          <TourFilter />
          {/* Danh sách Tour */}
          <div className="w-full md:w-3/4">
            {/* Ô tìm kiếm */}
            <SearchBar />
            {/* Danh sách Tour */}
            <div className="mt-4 space-y-4">
              <TourCard />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
