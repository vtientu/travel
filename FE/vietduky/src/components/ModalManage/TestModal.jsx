// pages/ModalAddTour.jsx
import { useEffect, useState } from "react";
import TourForm from "../ModalManage/ModalAddTour/TourForm";
import TourList from "../ModalManage/ModalAddTour/TourList";
import TextEditor from "../../lib/TextEditor";
import { fetchLocations, fetchServices, fetchTravelTours } from "../../services/service";

export default function ModalAddTour({ onClose }) {
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [travelTours, setTravelTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLocations(await fetchLocations());
      setServices(await fetchServices());
      setTravelTours(await fetchTravelTours());
    };
    fetchData();
  }, []);

  const handleCreateTour = async (tourData) => {
    try {
      const response = await fetch("http://localhost:3000/api/tour/create", {
        method: "POST",
        body: JSON.stringify(tourData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (response.ok) {
        alert("Tạo tour thành công!");
        setTravelTours(await fetchTravelTours());
        onClose();
      } else {
        alert(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
  };

  const handleDeleteTour = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tour/${id}`, { method: "DELETE" });
      setTravelTours((prev) => prev.filter((tour) => tour.id !== id));
    } catch (error) {
      alert("Lỗi khi xóa tour");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2>Thêm Tour du lịch</h2>

        <TourForm locations={locations} services={services} onSubmit={handleCreateTour} />

        <h3>Danh sách hành trình</h3>
        <TourList travelTours={travelTours} onDelete={handleDeleteTour} />

        <h3>Mô tả hành trình</h3>
        <TextEditor />

        <div className="flex justify-end">
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}
