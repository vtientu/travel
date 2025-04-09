import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { LuSearch } from "react-icons/lu";
import SearchDebounceInput from "../common/SearchDebouceInput";
import { getGuideTourByUserId } from "../../services/API/guide-tour.service";

const InstructionSchedule = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationsList, setLocationsList] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await getGuideTourByUserId(1);
        if (response.data) {
          setTours(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [search, location]);

  useEffect(() => {
    return () => {
      setTours([]);
      setLocationsList([]);
      setLoading(false);
      setSearch("");
      setLocation("");
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded">
      <div className="grid grid-cols-12 gap-4 items-center justify-start mb-5">
        <div className="col-span-3 relative w-full">
          <LuSearch className="absolute left-3 top-3 text-gray-500" />
          <SearchDebounceInput onChange={setSearch} value={search} />
        </div>
        <div className="col-span-2 w-full">
          <select
            className="px-4 py-2 border rounded-md w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Địa điểm</option>
            {locationsList.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-SmokyGray text-left bg-gray-100">
            <th className="p-2">STT</th>
            <th className="p-2">Tên tour</th>
            <th className="p-2">Điểm khởi hành</th>
            <th className="p-2">Điểm đến</th>
            <th className="p-2">Số ngày</th>
            <th className="p-2">Số lượng hành trình</th>
            <th className="p-2">Giá Tour</th>
            <th
              className="text-end p-2"
              style={{ width: "1%", whiteSpace: "nowrap" }}
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8">
                <Loader className="animate-spin mx-auto py-5" />
              </td>
            </tr>
          ) : tours.length > 0 ? (
            tours.map((tour, index) => (
              <tr key={tour.id} className="border-t">
                <td className=" p-2">{index + 1}</td>
                <td className=" p-2">{tour.travelTour.Tour.name_tour}</td>
                <td className=" p-2">{tour.startLocation?.name_location}</td>
                <td className=" p-2">{tour.day_number}</td>
                <td className=" p-2">{tour.max_people}</td>
                <td className=" p-2 text-left">
                  {Number(tour.price_tour).toLocaleString("vi-VN")} VND
                </td>
                <td className="flex justify-end p-2">
                  <HiOutlineDotsHorizontal />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                <h3 className="text-gray-500 py-3">Không có dữ liệu</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstructionSchedule;
