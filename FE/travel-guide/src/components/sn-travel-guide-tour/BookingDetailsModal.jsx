import { FileUp, XIcon } from "lucide-react";
import SearchDebounceInput from "../common/SearchDebouceInput";
import AddCustomerInfoModal from "./AddCustomerInfoModal";
import { useEffect, useState } from "react";
import { getBookingById } from "../../services/API/booking.service";
import {
  STATUS_BOOKING_COLOR,
  STATUS_BOOKING_TEXT,
} from "../../constants/app.constant";
const BookingDetailsModal = ({ booking, open, onClose }) => {
  const [openAddCustomerInfoModal, setOpenAddCustomerInfoModal] =
    useState(false);
  const [bookingDetail, setBookingDetail] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await getBookingById(booking.id);
      if (response.status === 200) {
        setBookingDetail(response.data.data);
      }
    };
    fetchBooking();
  }, [booking]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[90%] h-[90vh] max-w-7xl rounded-2xl p-6 overflow-hidden shadow-xl flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Thông tin chi tiết</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>{" "}
        <div className="grid grid-cols-4 gap-5 mb-5">
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium">Mã đặt Tour</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={booking?.booking_code}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium">Ngày đặt</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={booking?.booking_date}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium">Tên người đặt</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={booking?.name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium">Số điện thoại</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={booking?.phone}
            />
          </div>
          <div className="flex flex-col gap-1 col-span-4">
            <label className="text-md font-medium">Ghi chú</label>
            <textarea
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={booking?.note}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <h2 className="text-xl font-semibold">Danh sách khách hàng</h2>
          <div className="flex flex-row justify-between items-center">
            <div>
              <SearchDebounceInput
                placeholder="Tìm kiếm khách hàng"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </div>
            <div className="gap-1 flex justify-end items-center">
              <button className="border border-gray-300 px-4 py-2 rounded-md whitespace-nowrap flex gap-2">
                <FileUp /> Nhập danh sách
              </button>
              <button
                className="bg-[#A80F21] text-white px-4 py-2 rounded-md whitespace-nowrap"
                onClick={() => setOpenAddCustomerInfoModal(true)}
              >
                Thêm thông tin khách hàng
              </button>
            </div>
          </div>
          <table className="w-full flex-1">
            <thead>
              <tr>
                <th>Họ và tên khách hàng</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Độ tuổi</th>
                <th>Số điện thoại</th>
                <th>CCCD/Passport</th>
                <th>Phòng đơn</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {booking?.customers?.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.birthday}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.age}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.passport_number}</td>
                  <td>{customer.single_room}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">
              Trạng thái:{" "}
              <span
                className={`${STATUS_BOOKING_COLOR[bookingDetail?.status]}`}
              >
                {STATUS_BOOKING_TEXT[bookingDetail?.status]}
              </span>
            </h2>
            <h2 className="text-xl font-semibold">
              Tổng tiền{" "}
              <span className="text-[#A80F21]">
                {bookingDetail?.total_cost.toLocaleString("vi-VN")} VNĐ
              </span>
            </h2>
          </div>
          <div className="flex flex-row justify-end items-center gap-2">
            <button className="border border-gray-300 px-4 py-2 rounded-md whitespace-nowrap">
              Hủy
            </button>
            <button className="bg-[#A80F21] text-white px-4 py-2 rounded-md whitespace-nowrap">
              Lưu thao tác
            </button>
          </div>
        </div>
      </div>
      <AddCustomerInfoModal
        open={openAddCustomerInfoModal}
        onClose={() => setOpenAddCustomerInfoModal(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default BookingDetailsModal;
