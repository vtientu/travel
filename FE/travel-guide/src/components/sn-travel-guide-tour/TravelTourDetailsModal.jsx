import { useState, useEffect } from "react";
import axios from "axios";
import { Square, SquareCheck } from "lucide-react";

const TravelTourDetailsModal = ({ scheduleId, onClose, open }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`/api/tour-schedule/${scheduleId}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch schedule", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId]);

  if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;
  if (!data)
    return <div className="p-8 text-red-500">Không tìm thấy dữ liệu</div>;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-6xl p-6 rounded-lg shadow-xl relative overflow-x-auto overflow-y-hidden grid grid-cols-12 gap-4 h-4/5">
        <div className="flex flex-col gap-4 col-span-12 md:col-span-4">
          <h2 className="text-xl font-semibold mb-4">
            Thông tin lịch khởi hành
          </h2>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="text-sm text-gray-600">Điểm khởi hành</label>
              <input
                disabled
                className="w-full border px-3 py-2 rounded mt-1"
                value={
                  data?.departureDate
                    ? new Date(data.departureDate).toLocaleDateString()
                    : ""
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Điểm đến</label>
              <input
                disabled
                className="w-full border px-3 py-2 rounded mt-1"
                value={
                  data?.returnDate
                    ? new Date(data.returnDate).toLocaleDateString()
                    : ""
                }
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Tình trạng chỗ</label>
            <input
              disabled
              className="w-full border px-3 py-2 rounded mt-1"
              value={`${data?.availableSeats || 0}/${data?.totalSeats || 0}`}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Giá Tour</label>
            <input
              disabled
              className="w-full border px-3 py-2 rounded mt-1"
              value={data?.price?.toLocaleString("vi-VN")}
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-600">Nội dung ghi chú</label>
            <textarea
              disabled
              className="w-full border px-3 py-2 rounded mt-1"
              value={data?.note}
              placeholder="Không có ghi chú nào"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 border-l-2 border-gray-300 pl-4 h-full overflow-y-hidden">
          <h3 className="text-lg font-semibold mb-3">Danh sách khách hàng</h3>
          <div className="overflow-y-auto h-full">
            <table className="w-full text-sm">
              <thead className="text-gray-600 border-b font-semibold">
                <tr>
                  <th className="p-2 ">Họ tên</th>
                  <th className="p-2 ">Điện thoại</th>
                  <th className="p-2 ">Giới tính</th>
                  <th className="p-2 ">Ngày sinh</th>
                  <th className="p-2 ">Phòng đơn</th>
                  <th className="p-2 ">Khách sạn</th>
                  <th className="p-2 ">Nhà hàng</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((c, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-2 ">{c.fullName}</td>
                    <td className="p-2 ">{c.phoneNumber}</td>
                    <td className="p-2 ">{c.gender}</td>
                    <td className="p-2 ">
                      {new Date(c.birthDate).toLocaleDateString()}
                    </td>
                    <td className="p-2  flex justify-center items-center">
                      {c.room ? (
                        <SquareCheck className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-500" />
                      )}
                    </td>
                    <td className="p-2 ">{c.hotel}</td>
                    <td className="p-2 ">{c.restaurant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 text-right col-span-12">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelTourDetailsModal;
const customers = [
  {
    name: "Nguyễn Văn A",
    phone: "0912345670",
    gender: "Nam",
    dob: "1990-01-01",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Trần Thị B",
    phone: "0987654321",
    gender: "Nữ",
    dob: "1992-05-12",
    room: true,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Lê Văn C",
    phone: "0901122334",
    gender: "Nam",
    dob: "1988-10-15",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Phạm Thị D",
    phone: "0933445566",
    gender: "Nữ",
    dob: "1995-03-20",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Hoàng Văn E",
    phone: "0966112233",
    gender: "Nam",
    dob: "1989-08-08",
    room: false,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Vũ Thị F",
    phone: "0977334455",
    gender: "Nữ",
    dob: "1993-12-30",
    room: true,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Đặng Văn G",
    phone: "0944223311",
    gender: "Nam",
    dob: "1991-06-14",
    room: false,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Ngô Thị H",
    phone: "0922334455",
    gender: "Nữ",
    dob: "1987-11-11",
    room: true,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Bùi Văn I",
    phone: "0933221144",
    gender: "Nam",
    dob: "1994-09-09",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Lý Thị J",
    phone: "0988445566",
    gender: "Nữ",
    dob: "1996-04-04",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Tô Văn K",
    phone: "0900778899",
    gender: "Nam",
    dob: "1990-07-07",
    room: true,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Đỗ Thị L",
    phone: "0911667788",
    gender: "Nữ",
    dob: "1986-02-28",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Mai Văn M",
    phone: "0922113344",
    gender: "Nam",
    dob: "1993-05-05",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Trịnh Thị N",
    phone: "0966554433",
    gender: "Nữ",
    dob: "1997-03-17",
    room: false,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Phan Văn O",
    phone: "0933111222",
    gender: "Nam",
    dob: "1985-12-12",
    room: true,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Bùi Văn I",
    phone: "0933221144",
    gender: "Nam",
    dob: "1994-09-09",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Lý Thị J",
    phone: "0988445566",
    gender: "Nữ",
    dob: "1996-04-04",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Tô Văn K",
    phone: "0900778899",
    gender: "Nam",
    dob: "1990-07-07",
    room: true,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Đỗ Thị L",
    phone: "0911667788",
    gender: "Nữ",
    dob: "1986-02-28",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Mai Văn M",
    phone: "0922113344",
    gender: "Nam",
    dob: "1993-05-05",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Trịnh Thị N",
    phone: "0966554433",
    gender: "Nữ",
    dob: "1997-03-17",
    room: false,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Phan Văn O",
    phone: "0933111222",
    gender: "Nam",
    dob: "1985-12-12",
    room: true,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Bùi Văn I",
    phone: "0933221144",
    gender: "Nam",
    dob: "1994-09-09",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Lý Thị J",
    phone: "0988445566",
    gender: "Nữ",
    dob: "1996-04-04",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Tô Văn K",
    phone: "0900778899",
    gender: "Nam",
    dob: "1990-07-07",
    room: true,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Đỗ Thị L",
    phone: "0911667788",
    gender: "Nữ",
    dob: "1986-02-28",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Mai Văn M",
    phone: "0922113344",
    gender: "Nam",
    dob: "1993-05-05",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Trịnh Thị N",
    phone: "0966554433",
    gender: "Nữ",
    dob: "1997-03-17",
    room: false,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Phan Văn O",
    phone: "0933111222",
    gender: "Nam",
    dob: "1985-12-12",
    room: true,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Bùi Văn I",
    phone: "0933221144",
    gender: "Nam",
    dob: "1994-09-09",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Lý Thị J",
    phone: "0988445566",
    gender: "Nữ",
    dob: "1996-04-04",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Tô Văn K",
    phone: "0900778899",
    gender: "Nam",
    dob: "1990-07-07",
    room: true,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Đỗ Thị L",
    phone: "0911667788",
    gender: "Nữ",
    dob: "1986-02-28",
    room: false,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
  {
    name: "Mai Văn M",
    phone: "0922113344",
    gender: "Nam",
    dob: "1993-05-05",
    room: true,
    hotel: "Khách sạn 3",
    restaurant: "Nhà hàng A",
  },
  {
    name: "Trịnh Thị N",
    phone: "0966554433",
    gender: "Nữ",
    dob: "1997-03-17",
    room: false,
    hotel: "Khách sạn 2",
    restaurant: "Nhà hàng B",
  },
  {
    name: "Phan Văn O",
    phone: "0933111222",
    gender: "Nam",
    dob: "1985-12-12",
    room: true,
    hotel: "Khách sạn 1",
    restaurant: "Nhà hàng C",
  },
];
