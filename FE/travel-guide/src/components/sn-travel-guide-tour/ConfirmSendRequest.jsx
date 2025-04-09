import { sendRequestTour } from "../../services/API/guide-tour.service";

const ConfirmSendRequest = ({ tourId, open, onClose }) => {
  const handleSendRequest = async (tourId) => {
    try {
      const response = await sendRequestTour({
        travel_tour_id: tourId,
        guide_tour_id: 1,
      });
      if (response.status === 200) {
        alert("Gửi yêu cầu thành công");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg  max-w-lg">
        <h2 className="text-xl font-bold mb-2">
          Bạn có hoàn toàn chắc chắn không?
        </h2>
        <p>
          Không thể hoàn tác hành động này. Yêu cầu nhận lịch khởi hành này sẽ
          được chuyển tới Quản Trị Viên xem xét yêu cầu.
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#D32F44] text-white px-4 py-2 rounded-md mr-2"
            onClick={() => handleSendRequest(tourId)}
          >
            Xác nhận
          </button>
          <button
            className="border border-gray-400 text-black px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSendRequest;
