import {useState, useRef, useEffect} from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Header from "../components/Header/Header";
import SearchTour from "../components/SearchTour/SearchTour";
import SearchButton from "../components/SearchButton/SearchButton";
import Footer from "../components/Footer/Footer";

export default function LayoutLandingPage() {
  const [discounts, setDiscounts] = useState([]);
  const scrollRefs = useRef([]);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discountRes, tourRes, locationRes] = await Promise.all([
          fetch("http://localhost:3000/api/discount-service/").then((res) => res.json()),
          fetch("http://localhost:3000/api/tour").then((res) => res.json()),
          fetch("http://localhost:3000/api/location/").then((res) => res.json()),
        ]);

        if (discountRes?.data) {
          setDiscounts(discountRes.data);
        }

        setTours(tourRes);
        setFilteredTours(tourRes);

        const cityList = ["Tất cả", ...locationRes.map((location) => location.name_location)];
        setCities(cityList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredTours(tours);
      return;
    }

    const fetchToursByLocation = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tour/get-by-location-id/${activeTab}`);
        const data = await res.json();
        console.log(`Dữ liệu tour cho locationId (${activeTab}):`, data);

        if (Array.isArray(data)) {
          setFilteredTours(data);
        } else {
          setFilteredTours([]);
        }
      } catch (error) {
        console.error(`Lỗi khi fetch tour cho locationId (${activeTab}):`, error);
        setFilteredTours([]);
      }
    };

    fetchToursByLocation();
  }, [activeTab, tours]);

  const handleMouseDown = (index, e) => {
    if (!scrollRefs.current[index]) return;

    e.preventDefault();
    const startX = e.clientX;
    const scrollLeft = scrollRefs.current[index].scrollLeft;

    const onMouseMove = (moveEvent) => {
      const x = moveEvent.clientX;
      const walk = (x - startX) * 2;
      scrollRefs.current[index].scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= rating) {
  //       stars.push(<FaStar key={i} className="text-yellow-400" />);
  //     } else if (i - 0.5 === rating) {
  //       stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
  //     } else {
  //       stars.push(<FaRegStar key={i} className="text-yellow-400" />);
  //     }
  //   }
  //   return stars;
  // };

  return (
      <div className="bg-white" style={{backgroundImage: "url('/Image/Background.png')", backgroundSize: "cover", backgroundPosition: "center", width: "100%", minHeight: "100vh",}}>

        {/* Header */}
        <Header/>

        <div className="relative">
        <SearchTour />
        </div>

        {/* Gói quà chào mừng cho người dùng! */}
        <div className="p-6 relative w-4/5 mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">
            🎁 Gói quà chào mừng cho người dùng!
          </h2>
        </div>
        <div className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab" ref={(el) => (scrollRefs.current[0] = el)} onMouseDown={(e) => handleMouseDown(0, e)}>
          <img src="/Image/Qua chao mung.png" alt="Khuyến mãi" width={800} height={200} className="rounded-lg pointer-events-none"/>
          <img src="/Image/Qua chao mung.png" alt="Khuyến mãi" width={800} height={200} className="rounded-lg pointer-events-none"/>
          <img src="/Image/Qua chao mung.png" alt="Khuyến mãi" width={800} height={200} className="rounded-lg pointer-events-none"/>
          <img src="/Image/Qua chao mung.png" alt="Khuyến mãi" width={800} height={200} className="rounded-lg pointer-events-none"/>
        </div>
      </div>

        {/* Chương trình khuyến mại */}
        <div className="p-6 relative w-3/5 mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">Chương trình khuyến mại</h2>
          <a href="/deals" className="text-red-600 hover:underline">
            Xem tất cả
          </a>
        </div>

        <div className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab" style={{ scrollbarWidth: "none" }} ref={(el) => (scrollRefs.current[1] = el)} onMouseDown={handleMouseDown}>
          {discounts.map((discount) => (
              <div key={discount.id} className="bg-white shadow-lg rounded-lg p-4 min-w-[300px]">
                <h3 className="text-lg font-semibold">{discount.programDiscount.discount_name}</h3>
                <p className="text-sm text-gray-600">{discount.programDiscount.description}</p>
                <p className="text-red-500 font-bold">Giảm {discount.programDiscount.percent_discount}%</p>
                <p className="text-gray-700">Giá gốc: {discount.travelTour.price_tour.toLocaleString()} VND</p>
                <p className="text-green-600 font-semibold">
                  Giá sau giảm: {(discount.travelTour.price_tour - discount.programDiscount.discount_value).toLocaleString()} VND
                </p>
              </div>
          ))}
        </div>
      </div>

        {/* Tour trong nước nổi bật */}
        <div className="p-6 relative w-3/5 mx-auto">
          <h2 className="text-xl font-bold">Tour trong nước nổi bật</h2>

          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex space-x-6">
              {cities.map((city) => (
                  <button
                      key={city}
                      className={`px-4 py-2 text-sm font-medium ${
                          activeTab === city ? "text-red-700 border-b-2 border-red-700" : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab(city)}
                  >
                    {city}
                  </button>
              ))}
            </div>
            <p className="text-red-600 font-medium cursor-pointer">
              Xem tất cả chuyến đi ({activeTab})
            </p>
          </div>

          <div
              className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab"
              style={{ scrollbarWidth: "none" }}
              ref={(el) => (scrollRefs.current[3] = el)}
          >
            {filteredTours.map((tour) => (
                <div key={tour.id} className="w-72 bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                      src={tour.image || "/Image/Image [sc-fFubgz] (1).png"}
                      alt={tour.name_tour}
                      width={300}
                      height={200}
                      className="w-full"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{tour.name_tour}</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-500 text-xs">📍 {tour.endLocation.name_location}</p>
                    </div>
                    <p className="text-gray-400 text-xs">{tour.activity_description}</p>
                    <p className="text-red-600 font-bold">VND: {tour.price_tour.toLocaleString()}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Khám phá vị trí vui chơi ở Việt Nam */}
        <div className="p-6 relative w-3/5 mx-auto scrollbar-hide">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold">
            Khám phá vị trí vui chơi ở Việt Nam
          </h2>
          <a href="#" className="text-red-600 hover:underline">
            Xem tất cả
          </a>
        </div>
        <div className="flex space-x-4 mt-8 overflow-x-auto scrollbar-hide cursor-grab" style={{ scrollbarWidth: "none" }} ref={(el) => (scrollRefs.current[4] = el)} onMouseDown={(e) => handleMouseDown(4, e)}>
          {[...Array(6)].map((_, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img src="/Image/Div [afa2c-box] (1).png" alt="Khuyến mãi" className="rounded-lg pointer-events-none" style={{ display: "block", margin: "0 auto" }}/>
              <p style={{marginTop: "8px", fontSize: "1rem", fontWeight: "500", textAlign: "center",}}>
                Hồ Chí Minh
              </p>
            </div>
          ))}
        </div>
      </div>

        <Footer/>
    </div>
  );
}
