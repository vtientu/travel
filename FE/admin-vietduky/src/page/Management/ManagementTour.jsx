import { useEffect, useState } from "react";
import Layout from "../../layouts/LayoutManagement";
import ModalAddTour from "../../components/ModalManage/ModalTour/ModalAddTour";
import { LuSearch } from "react-icons/lu";
import DropdownMenu from "../../components/Dropdown/DropdownMenuTour";
import ModalManageTravelTour from "../../components/ModalManage/ModalTour/ModalManageTravelTour"; // Import modal quản lý hành trình
import { getTours } from "../../services/API/tour.service";
import ModalUpdateTour from "../../components/ModalUpdate/ModalUpdateTour.jsx";

export default function ManagementTour() {
  const [tours, setTours] = useState([]);
  const [location, setLocation] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedTour, setSelectedTour] = useState(null);

  const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false); // Modal thêm Tour
  const [isManageTravelTourModalOpen, setIsManageTravelTourModalOpen] = useState(false); // Modal quản lý hành trình
  const [openDropdown, setOpenDropdown] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [isUpdateTourModalOpen, setIsUpdateTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Mở/đóng modal thêm Tour
  const toggleAddTourModal = () => {
    setIsAddTourModalOpen(!isAddTourModalOpen);
  };

  // Mở/đóng modal quản lý hành trình
  const toggleManageTravelTourModal = () => {
    setIsManageTravelTourModalOpen(!isManageTravelTourModalOpen);
  };

  // call API to get tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursData = await getTours();
        console.log("Dữ liệu từ API:", toursData);
  
        if (Array.isArray(toursData)) {
          setTours(toursData);
        } else {
          console.error("Dữ liệu API không đúng định dạng:", toursData);
          setTours([]);
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API", error);
        setTours([]);
      }
    };
  
    fetchTours();
  }, []);

  // Filter Location
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursData = await getTours();

        if (Array.isArray(toursData)) {
          setTours(toursData);

          // Lọc địa điểm từ startLocation (duy nhất)
          const uniqueLocations = [
            ...new Set(
                toursData
                    .map((tour) => tour?.startLocation?.name_location)
                    .filter(Boolean)
            ),
          ];
          setLocationsList(uniqueLocations);
        } else {
          console.error("Dữ liệu API không đúng định dạng:", toursData);
          setTours([]);
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API", error);
        setTours([]);
      }
    };

    fetchTours();
  }, []);

  const handleDeleteTour = (id) => {
    setTours((prev) => prev.filter((tour) => tour.id !== id));
  };

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setIsUpdateTourModalOpen(true);
  };

  const handleManageTravelTour = (tourId) => {
    setSelectedTour(tourId); // Lưu ID của tour được chọn
    toggleManageTravelTourModal(); // Mở modal quản lý hành trình
  };

  return (
    <Layout title="Quản lý Tour">
      <div>
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-md flex gap-4 items-center">
          <div className="relative flex-1 ">
            <LuSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bằng từ khóa"
              className="pl-10 pr-4 py-2 border rounded-md w-1/3"
            />
          </div>
          <div className="flex gap-3">
            <button className="border border-red-700 text-red-700  hover:bg-red-300  px-4 py-2 rounded-md">
              Nhập danh sách chủ đề
            </button>
          </div>

          {/* Bộ lọc Địa điểm */}
          <div>
            <select
                className="px-4 py-2 border border-red-600 text-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Tất cả địa điểm</option>
              {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
              ))}
            </select>
          </div>

          {/* Bộ lọc giá tour */}
          <div>
            <select
                className="px-4 py-2 border border-red-600 text-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Tất cả </option>
              <option value="low">Dưới 5 triệu</option>
              <option value="medium">5 - 10 triệu</option>
              <option value="high">Trên 10 triệu</option>
            </select>
          </div>

          {/* Nút thêm tour */}
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md shadow-md"
            onClick={toggleAddTourModal}
          >
            Thêm Tour mới
          </button>
        </div>

        {/* Tour List */}
        <div className="relative">
          {/* Lớp phủ (Backdrop) để đóng dropdown khi click bên ngoài */}
          {openDropdown !== null && (
            <div
              className="fixed inset-0 bg-transparent"
              onClick={() => setOpenDropdown(null)}
            ></div>
          )}

          <div className="mt-4 bg-white p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-SmokyGray">
                  <th className="p-2 text-left">Tên Tour</th>
                  <th className="p-2 text-left">Địa điểm</th>
                  <th className="p-2">Số ngày</th>
                  <th className="p-2">Số lượng hành trình</th>
                  <th className="p-2 text-left">Giá Tour</th>
                  <th className="text-end p-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
              {tours
                  .filter((tour) => {
                    if (location && tour?.startLocation?.name_location !== location) return false;

                    const price = tour.price_tour;
                    if (priceFilter === "low" && price >= 5_000_000) return false;
                    if (priceFilter === "medium" && (price < 5_000_000 || price > 10_000_000)) return false;
                    if (priceFilter === "high" && price <= 10_000_000) return false;

                    return true;
                  })
                  .map((tour) => (
                      <tr key={tour.id} className="border-t text-center">
                        <td className="p-2 text-left">{tour.name_tour}</td>
                        <td className="p-2 text-left">
                          {tour?.startLocation?.name_location}
                          <span> → </span>
                          {tour?.endLocation?.name_location}
                        </td>
                        <td className="p-2">{tour.day_number}</td>
                        <td className="p-2">{tour.max_people}</td>
                        <td className="p-2 text-red-600 font-semibold text-left">
                          {Number(tour.price_tour).toLocaleString("vi-VN")} VND
                        </td>
                        <td className="flex justify-end p-2 relative">
                          <button onClick={() => toggleDropdown(tour.id)} className="relative">
                            <DropdownMenu
                                tour={tour}
                                onDelete={handleDeleteTour}
                                onManageTravelTour={() => handleManageTravelTour(tour.id)}
                                onEdit={() => handleEditTour(tour)}
                            />
                          </button>
                        </td>
                      </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal thêm Tour */}
        {isAddTourModalOpen && <ModalAddTour onClose={toggleAddTourModal} />}

        {/* Modal quản lý hành trình */}
        {isManageTravelTourModalOpen && (
          <ModalManageTravelTour tourId={selectedTour} onClose={toggleManageTravelTourModal}/>
        )}

        {/* Modal update */}
        {isUpdateTourModalOpen && (
            <ModalUpdateTour tour={editingTour} onClose={() => setIsUpdateTourModalOpen(false)}
                onSuccess={(updatedTour) => {
                  setTours((prev) =>
                      prev.map((t) => (t.id === updatedTour.id ? updatedTour : t))
                  );
                  setIsUpdateTourModalOpen(false);
                }}
            />
        )}

      </div>
    </Layout>
  );
}