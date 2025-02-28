import {useState, useRef, useEffect} from "react";
import {FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaDotCircle} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchTour() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Khách sạn");

  const [selected, setSelected] = useState("tour");
  const scrollRefs = useRef([]);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/location/")
        .then((response) => response.json())
        .then((data) => setLocations(data))
        .catch((error) => console.error("Error fetching locations:", error));
  }, []);
  return (
    <div className="relative">
      {/* Background Image */}
      <div style={{position: "relative", width: "100%", height: "300px", overflow: "hidden", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px",}}>
        <img
          src="/Image/Div.png"
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}/>

        {/* Hashtag */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold -mt-40">
            RONG CHƠI BỐN PHƯƠNG, GIÁ VẪN{" "}
            <span className="text-yellow-400">"YÊU THƯƠNG"</span>
          </h2>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative w-full bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto -mt-40">
        {/* Tabs */}

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            className={`px-4 py-2 rounded-full font-medium shadow-sm transition ${
              selected === "tour"
                ? "bg-red-700 text-white"
                : "bg-red-100 text-red-700"
            }`}
            onClick={() => {
              setSelected("ai");
              navigate("/");
            }}
          >
            Tìm kiếm Tour
          </button>

          <button
            className={`px-4 py-2 rounded-full font-medium shadow-sm transition ${
              selected === "ai"
                ? "bg-red-700 text-white"
                : "bg-red-100 text-red-700"
            }`}
            onClick={() => {
              setSelected("ai");
              navigate("/personalAI");
            }}
          >
            Cá nhân hóa bằng AI
          </button>
        </div>

        {/* Search Form */}
        <div className="mt-4 space-y-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center border rounded-lg p-3">
            <span className="text-gray-500 mr-2">🔍</span>
            <input
                type="text"
                placeholder="Nhập điểm du lịch"
                className="w-full outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col border rounded-lg p-3">
              <span className="text-gray-500 text-sm">Ngày khởi hành</span>
              <input
                  type="date"
                  className="outline-none text-gray-700"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col border rounded-lg p-3">
          <span className="text-gray-500 text-sm flex items-center">
            <FaDotCircle className="mr-2" /> Điểm khởi hành
          </span>
              <select
                  className="outline-none text-gray-700"
                  value={selectedStart}
                  onChange={(e) => setSelectedStart(e.target.value)}
              >
                <option value="">Chọn điểm khởi hành</option>
                {locations.map((location) => (
                    <option key={location.id} value={location.name_location}>
                      {location.name_location}
                    </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col border rounded-lg p-3">
          <span className="text-gray-500 text-sm flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Điểm đến
          </span>
              <select
                  className="outline-none text-gray-700"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="">Chọn điểm đến</option>
                {locations.map((location) => (
                    <option key={location.id} value={location.name_location}>
                      {location.name_location}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <button className="w-full h-200 bg-red-600 text-white py-2 rounded-lg font-semibold">
            TÌM
          </button>
        </div>
      </div>
    </div>
  );
}
