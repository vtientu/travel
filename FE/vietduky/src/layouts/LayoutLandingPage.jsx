import { useState, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import SearchTour from "../components/SearchTour/SearchTour";
import SearchButton from "../components/SearchButton/SearchButton";
import Footer from "../components/Footer/Footer";

export default function LayoutLandingPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Khách sạn");
  const tabs = [
    "Khách sạn",
    "Nhà và Căn hộ",
    "Vé máy bay",
    "Hoạt động",
    "Đưa đón sân bay",
  ];
  const [selected, setSelected] = useState("tour");
  const cities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];
  const scrollRefs = useRef([]);
  const navigate = useNavigate(); // Khai báo hook điều hướng

  const handleMouseDown = (index, e) => {
    if (!scrollRefs.current[index]) return;

    e.preventDefault(); // Ngăn chặn hành vi kéo thả mặc định
    const startX = e.clientX;
    const scrollLeft = scrollRefs.current[index].scrollLeft;

    const onMouseMove = (moveEvent) => {
      const x = moveEvent.clientX;
      const walk = (x - startX) * 2; // Điều chỉnh tốc độ cuộn
      scrollRefs.current[index].scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
      <div className="bg-white" style={{backgroundImage: "url('/Image/Background.png')", backgroundSize: "cover", backgroundPosition: "center", width: "100%", minHeight: "100vh",}}>

        {/* Header */}
        <Header/>

        <div className="relative">
        <SearchTour />
        </div>

         {/* Search Button */}
         <SearchButton />

        {/* Gói quà chào mừng cho người dùng! */}
        <div className="p-6 relative w-4/5 mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">
            🎁 Gói quà chào mừng cho người dùng!
          </h2>
        </div>
        <div
          className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab"
          ref={(el) => (scrollRefs.current[0] = el)}
          onMouseDown={(e) => handleMouseDown(0, e)}
        >
          <img
            src="/Image/Qua chao mung.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Qua chao mung.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Qua chao mung.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Qua chao mung.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
        </div>
      </div>

        {/* Chương trình khuyến mại */}
        <div className="p-6 relative w-3/5 mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">Chương trình khuyến mại</h2>
          <a href="#" className="text-red-600 hover:underline">
            Xem tất cả
          </a>
        </div>
        <div
          className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: "none" }}
          ref={(el) => (scrollRefs.current[1] = el)}
          onMouseDown={(e) => handleMouseDown(1, e)}
        >
          <img
            src="/Image/Uudai.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Uudai.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Uudai.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Uudai.png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
        </div>
      </div>

        {/* Khuyến mãi chuyến bay và hoạt động  */}
        <div className="p-6 relative w-3/5 mx-auto scrollbar-hide">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">
            Khuyến mại Chuyến bay và Hoạt động
          </h2>
          <a href="#" className="text-red-600 hover:underline">
            Xem tất cả
          </a>
        </div>
        <div
          className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: "none" }}
          ref={(el) => (scrollRefs.current[2] = el)}
          onMouseDown={(e) => handleMouseDown(2, e)}
        >
          <img
            src="/Image/Image [sc-fFubgz].png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Image [sc-fFubgz].png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Div [afa2c-box].png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
          <img
            src="/Image/Div [afa2c-box].png"
            alt="Khuyến mãi"
            width={800}
            height={200}
            className="rounded-lg pointer-events-none"
          />
        </div>
      </div>

        {/* Tour trong nước nổi bật */}
        <div className="p-6 relative w-3/5 mx-auto">
        <h2 className="text-xl font-bold">Tour trong nước nổi bật</h2>

        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex space-x-4">
            {cities.map((city) => (
              <button
                key={city}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === city
                    ? "text-red-700 border-b-2 border-red-700"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(city)}
              >
                {city}
              </button>
            ))}
          </div>
          <p className="text-red-600 font-medium">
            Xem tất cả các chỗ nghỉ ({activeTab})
          </p>
        </div>

        <div
          className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: "none" }}
          ref={(el) => (scrollRefs.current[3] = el)}
          onMouseDown={(e) => handleMouseDown(3, e)}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-72 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src="/Image/Image [sc-fFubgz] (1).png"
                alt="Khách sạn"
                width={300}
                height={200}
                className="w-full"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Tên khách sạn {index + 1}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs">
                    {renderStars(4.5)}
                  </div>
                  <p className="text-gray-500 text-xs">
                    📍 Quận {index + 1}, Hồ Chí Minh
                  </p>
                </div>
                <p className="text-gray-400 text-xs">
                  Giá mỗi đêm chưa gồm thuế và phí
                </p>
                <p className="text-red-600 font-bold">
                  VND: {450000 + index * 100000}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Khám phá địa điểm vui chơi ở Việt Nam */}
        <div className="p-6 relative w-3/5 mx-auto scrollbar-hide">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">
            Khám phá địa điểm vui chơi ở Việt Nam
          </h2>
          <a href="#" className="text-red-600 hover:underline">
            Xem tất cả
          </a>
        </div>
        <div
          className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab"
          style={{ scrollbarWidth: "none" }}
          ref={(el) => (scrollRefs.current[4] = el)}
          onMouseDown={(e) => handleMouseDown(4, e)}
        >
          {[...Array(6)].map((_, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src="/Image/Div [afa2c-box] (1).png"
                alt="Khuyến mãi"
                className="rounded-lg pointer-events-none"
                style={{ display: "block", margin: "0 auto" }} // Căn giữa ảnh
              />
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Hồ Chí Minh
              </p>
            </div>
          ))}
        </div>
      </div>

        {/* Footer */}
        <Footer/>
    </div>
  );
}
