import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { LuSearch } from "react-icons/lu";
import SearchDebounceInput from "../common/SearchDebouceInput";
import { getGuideTourByUserId } from "../../services/API/guide-tour.service";
import { getLocations } from "../../services/API/location.service";
import Pagination from "../common/Pagination";
import TravelTourDetailsModal from "./TravelTourDetailsModal";
import { formatDate } from "../../utils/dateUtil";
import TabsTour from "./TabsTour";

const InstructionSchedule = () => {
  const [tourId, setTourId] = useState(null);
  const [tab, setTab] = useState("all");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [locationsList, setLocationsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await getGuideTourByUserId(1, {
          ...pagination,
          name_tour: search,
          start_location_id: startLocation,
          end_location_id: endLocation,
          status: tab !== "all" && tab !== 1 ? tab : null,
          upcoming: tab === 1 ? true : false,
        });
        if (response.data.items) {
          setTours(response.data.items);
          setTotalPages(response.data.totalPages);
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
  }, [search, startLocation, endLocation, pagination, tab]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getLocations(null, null);

      if (response) {
        setLocationsList(response);
      }
    };
    fetchLocations();
    return () => {
      setTours([]);
      setLocationsList([]);
      setLoading(false);
      setSearch("");
      setStartLocation("");
      setEndLocation("");
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded flex-1 flex flex-col">
      <TabsTour tabs={tabs} value={tab} onChange={setTab} />
      <div className="grid grid-cols-12 gap-4 items-center justify-start my-4">
        <div className="col-span-3 relative w-full">
          <LuSearch className="absolute left-3 top-3 text-gray-500" />
          <SearchDebounceInput
            onChange={setSearch}
            value={search}
            placeholder="Tên tour ..."
          />
        </div>
        <div className="col-span-3 w-full">
          <select
            className="px-4 py-2 border rounded-md w-full"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          >
            <option value="">Địa điểm khởi hành</option>
            {locationsList.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name_location}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-3 w-full">
          <select
            className="px-4 py-2 border rounded-md w-full"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          >
            <option value="">Địa điểm kết thúc</option>
            {locationsList.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name_location}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-3 w-full">
          <input
            className="px-4 py-2 border rounded-md w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
          />
        </div>
      </div>
      <div className="flex-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-SmokyGray text-left bg-gray-100">
              <th className="p-2">STT</th>
              <th className="p-2">Tên tour</th>
              <th className="p-2 text-center">Điểm khởi hành</th>
              <th className="p-2 text-center">Điểm kết thúc</th>
              <th className="p-2 text-center">Ngày khởi hành</th>
              <th className="p-2 text-center">Ngày về</th>
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
                <tr key={tour.id} className="border-t h-5">
                  <td className=" p-2">{index + 1}</td>
                  <td className=" p-2">{tour?.travelTour?.Tour?.name_tour}</td>
                  <td className=" p-2 text-center">
                    {tour?.travelTour?.Tour?.startLocation?.name_location}
                  </td>
                  <td className=" p-2 text-center">
                    {tour?.travelTour?.Tour?.endLocation?.name_location}
                  </td>
                  <td className=" p-2 text-center">
                    {tour?.travelTour?.start_day
                      ? formatDate(tour?.travelTour?.start_day)
                      : ""}
                  </td>
                  <td className=" p-2 text-center">
                    {tour?.travelTour?.end_day
                      ? formatDate(tour?.travelTour?.end_day)
                      : ""}
                  </td>
                  <td className="flex justify-end p-2">
                    <button
                      className="hover:text-red-500"
                      onClick={() => setTourId(tour.id)}
                    >
                      <HiOutlineDotsHorizontal />
                    </button>
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
      <Pagination
        pagination={pagination}
        onPageChange={setPagination}
        totalPages={totalPages}
      />
      <TravelTourDetailsModal
        tourId={tourId}
        open={!!tourId}
        title={
          tours.find((tour) => tour.id === tourId)?.travelTour?.Tour?.name_tour
        }
        onClose={() => setTourId(null)}
      />
    </div>
  );
};

export default InstructionSchedule;

const tabs = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Lịch trình sắp khởi hành",
    value: 1,
  },
  {
    label: "Lịch trình đã hoàn thành",
    value: 2,
  },
  {
    label: "Lịch trình đã hủy",
    value: 3,
  },
];
