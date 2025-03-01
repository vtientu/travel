// components/TourList.jsx
import { formatDayDMY } from "../../../utils/dateUtil";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TourList({ travelTours, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Ngày khởi hành</th>
          <th>Ngày về</th>
          <th>Tình trạng chỗ</th>
          <th>Giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {travelTours.length > 0 ? (
          travelTours.map((tour) => (
            <tr key={tour.id}>
              <td>{formatDayDMY(tour.start_time)}</td>
              <td>{formatDayDMY(tour.end_time)}</td>
              <td>{tour.max_people}</td>
              <td>{tour.price_tour.toLocaleString("vi-VN")} VNĐ</td>
              <td>
                <button>
                  <MdEdit />
                </button>
                <button onClick={() => onDelete(tour.id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Chưa có hành trình nào</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
