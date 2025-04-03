import Banner from "../../assets/images/Banner.png";
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
      <div className="relative w-100 h-[500px] overflow-hidden bg-opacity-30 rounded-b-[48px]">
        <img
          src={Banner}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(70%)",
            position: "absolute",
            top: 0,
            transform: "scale(1.1)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Search Box */}
      <div className="absolute w-full bg-[rgba(0,0,0,0.3)] shadow-md rounded mx-auto bottom-20 left-1/4 transform -translate-x-1/4 max-w-5xl z-10">
        <div className="flex flex-col justify-center text-left p-4 text-white">
          <h2 className="text-5xl font-bold leading-10">Thế giới tour trong tay bạn</h2>
          <p className="text-xl font-normal leading-snug mt-2">Phục vụ tận tâm, giá siêu ưu đãi</p>
        </div>
        {/* Search Form */}
        <div className="space-y-4 p-4 bg-transparent rounded">
          <div className="flex items-center bg-white rounded p-4 h-16 w-full text-lg">
            <span className="text-gray-500 mr-3 text-xl">
              <img src={Icons.LocationThin} className="w-6 h-6" />
            </span>
            <input
              type="text"
              placeholder="Nhập điểm du lịch"
              className="w-full outline-none text-lg p-2"
            />
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="flex items-center bg-white rounded p-2 w-full col-span-2">
              <img
                src={Icons.CalendarThin}
                className="w-6 h-6 text-gray-400 ml-1"
              />

              <div className="ml-4 flex flex-col">
                <span className="text-gray-400 text-normal">
                  Ngày khởi hành
                </span>
                <span
                  className="text-black text-md cursor-pointer"
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

            <div className="relative w-full col-span-2" ref={dropdownRef}>
              {/* Vùng bấm mở dropdown */}
              <div
                className="flex items-center bg-white rounded p-2 w-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* Icon */}
                <img src={Icons.PlanePaper} className="text-gray-400 w-6 h-6" />

                {/* Text */}
                <div className="ml-3 flex flex-col">
                  <span className="text-gray-400 text-normal">
                    Điểm khởi hành
                  </span>
                  <span className="text-black text-md">
                    {selectedStart ? selectedStart : "Chọn điểm khởi hành"}
                  </span>
                </div>
              </div>

              {/* Dropdown List */}
              {isOpen && (
                <div className="absolute left-0 top-full mt-1 w-full border rounded bg-white shadow-md">
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

            <div className="flex flex-col col-span-1">
              <button className="bg-[#A80F21] text-white h-[64px] p-4 rounded text-xl shadow-xl hover:bg-[#991b1b] transition duration-300 ease-in-out">
                TÌM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
