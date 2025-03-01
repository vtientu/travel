// components/TourForm.jsx
import { useState } from "react";

export default function TourForm({ locations, services, onSubmit }) {
  const [tourData, setTourData] = useState({
    name_tour: "",
    price_tour: "",
    day_number: "",
    max_people: "",
    start_location: "",
    end_location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTourData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tourData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Nhập thông tin Tour */}
      <div>
        <label>Tên Tour:</label>
        <input type="text" name="name_tour" onChange={handleChange} required />
      </div>

      <div>
        <label>Điểm khởi hành:</label>
        <select name="start_location" onChange={handleChange} required>
          <option value="">Chọn điểm khởi hành</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name_location}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Dịch vụ:</label>
        <select name="service_id">
          <option value="">Chọn dịch vụ</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name_service}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Tạo Tour</button>
    </form>
  );
}
