import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import TravelTourPendingModal from "./TravelTourPendingModal";
import { LuSearch } from "react-icons/lu";
import SearchDebounceInput from "../common/SearchDebouceInput";

const TravelTourPending = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationsList, setLocationsList] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getGuideTourByUserId(1);
        if (response.status === 200) {
          setTours(response.data);
        } else {
          console.log(response.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
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
            <th className="p-2">Ngày khởi hành</th>
            <th className="p-2">Ngày về</th>
            <th className="p-2">Tình trạng chỗ</th>
            <th className="p-2">Giá Tour</th>
            <th className="p-2">Trạng thái</th>
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
                <td className=" p-2">{tour.start_date}</td>
                <td className=" p-2">{tour.end_date}</td>
                <td className=" p-2">{tour.cho_ngoi}</td>
                <td className=" p-2 text-left">
                  {Number(tour.price_tour).toLocaleString("vi-VN")} VND
                </td>
                <td className=" p-2">{tour.status}</td>
                <td className="flex justify-end p-2">
                  {tour.status === "pending" && (
                    <button className="text-blue-500">Hủy yêu cầu</button>
                  )}
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
      <TravelTourPendingModal
        tourId="tour123"
        title="Tour HCM 4N3Đ: Hà Nội – Đà Nẵng – Sơn Trà – Bà Nà Hills – Hội An"
        onClose={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};

export default TravelTourPending;
