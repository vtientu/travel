import Icons from "../Icons/Icon";
import { LocationService } from "@/services/API/location.service";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchTour() {
  const [selected, setSelected] = useState("tour");
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [selectedStart, setSelectedStart] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Lắng nghe sự kiện click ngoài
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await LocationService.getAllLocations();
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="relative w-100 h-[300px] overflow-hidden bg-opacity-30 rounded-b-[48px]">
        <img
          src="/Image/Div.png"
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        />

        {/* Hashtag */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold -mt-40">
            RONG CHƠI BỐN PHƯƠNG, GIÁ VẪN{" "}
            <span className="text-yellow-400">"YÊU THƯƠNG"</span>
          </h2>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative w-full bg-[#F8F7F9] shadow-md rounded-2xl p-6 mx-auto -mt-40 max-w-[1480px]">
        {/* Buttons */}
        <div className="flex space-x-4 mt- pl-4">
          {/* Button "Tìm kiếm Tour" */}
          <button
            className={`px-4 py-2 rounded-full shadow-sm transition border ${
              selected === "tour"
                ? "border-red-700 text-red-700 bg-[#ffe4e6] font-bold"
                : "border-gray-300 text-gray-400 bg-white"
            }`}
            onClick={() => {
              setSelected("tour");
              navigate("/");
            }}
          >
            Tìm kiếm Tour
          </button>

          {/* Button "Cá nhân hóa bằng AI" */}
          <button
            className={`px-4 py-2 rounded-full font-medium shadow-sm transition border ${
              selected === "ai"
                ? "border-red-700 text-red-700 bg-white"
                : "border-gray-300 text-gray-400 bg-white"
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
        <div className="mt-4 space-y-4 p-4 bg-[#F8F7F9] rounded-lg">
          <div className="flex items-center  bg-white rounded-lg p-4 h-16 w-full text-lg">
            <span className="text-gray-500 mr-3 text-xl">
              <img src={Icons.Search} />
            </span>
            <input
              type="text"
              placeholder="Nhập điểm du lịch"
              className="w-full outline-none text-lg p-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center  bg-white rounded-lg p-3 w-full">
              <img
                src={Icons.Calendar}
                className="w-5 h-5 text-gray-400 ml-1"
              />

              <div className="ml-4 flex flex-col">
                <span className="text-gray-400 text-xs">Ngày khởi hành</span>
                <span
                  className="text-black font-semibold text-sm cursor-pointer"
                  onClick={() =>
                    document.getElementById("datePicker").showPicker()
                  }
                >
                  {date ? date : "Chọn ngày khởi hành"}
                </span>
              </div>

              <input
                type="date"
                id="datePicker"
                className="absolute opacity-0 w-0 h-0"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="relative w-full" ref={dropdownRef}>
              {/* Vùng bấm mở dropdown */}
              <div
                className="flex items-center bg-white rounded-lg p-3 w-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* Icon */}
                <img
                  src={Icons.AlertCircle}
                  className="text-gray-400 w-5 h-5"
                />

                {/* Text */}
                <div className="ml-3 flex flex-col">
                  <span className="text-gray-400 text-xs">Điểm khởi hành</span>
                  <span className="text-black font-semibold text-sm">
                    {selectedStart ? selectedStart : "Chọn điểm khởi hành"}
                  </span>
                </div>
              </div>

              {/* Dropdown List */}
              {isOpen && (
                <div className="absolute left-0 top-full mt-1 w-full border rounded-lg z-10 bg-white shadow-md">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setSelectedStart(location.name_location);
                        setIsOpen(false);
                      }}
                    >
                      {location.name_location}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col ">
              <button className="bg-[#A80F21] text-white p-4 rounded-xl text-xl shadow-xl hover:bg-[#991b1b] transition duration-300 ease-in-out">
                TÌM
              </button>

              {/*<span className="text-gray-500 text-sm flex items-center">*/}
              {/*  <FaMapMarkerAlt className="mr-2" /> Điểm đến*/}
              {/*</span>*/}
              {/*<select*/}
              {/*  className="outline-none text-gray-700"*/}
              {/*  value={selectedDestination}*/}
              {/*  onChange={(e) => setSelectedDestination(e.target.value)}>*/}
              {/*    <option value="">Chọn điểm đến</option>*/}
              {/*    {locations.map((location) => (*/}
              {/*    <option key={location.id} value={location.name_location}>*/}
              {/*      {location.name_location}*/}
              {/*    </option>*/}
              {/*      ))}*/}
              {/*</select>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
