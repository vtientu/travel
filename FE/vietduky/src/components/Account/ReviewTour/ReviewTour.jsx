import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import ModalSharePost from "./ModalSharePost";

const sharedPosts = [
  {
    id: 1,
    status: "pending",
    title:
      "Chia sẻ Kinh nghiệm: Khám Phá Sơn Trà – Phố Cổ Hội An – Bà Nà – Rừng Dừa Bảy Mẫu",
    date: "18/03/2025",
    image: "https://i.imgur.com/NT2YEGz.jpg",
    likes: 0,
    author: "PHẠM ĐỨC MẠNH",
  },
  {
    id: 2,
    status: "approved",
    title:
      "Chia sẻ Kinh nghiệm: Khám Phá Sơn Trà – Phố Cổ Hội An – Bà Nà – Rừng Dừa Bảy Mẫu",
    date: "18/03/2025",
    image: "https://i.imgur.com/NT2YEGz.jpg",
    likes: 1,
    author: "PHẠM ĐỨC MẠNH",
  },
  {
    id: 3,
    status: "locked",
    title:
      "Chia sẻ Kinh nghiệm: Khám Phá Sơn Trà – Phố Cổ Hội An – Bà Nà – Rừng Dừa Bảy Mẫu",
    date: "18/03/2025",
    image: "https://i.imgur.com/NT2YEGz.jpg",
    likes: 1,
    author: "PHẠM ĐỨC MẠNH",
  },
];

const reviews = [
    {
      id: 1,
      tourName: "Tour HCM 3N2Đ: Khám Phá Sơn Trà – Phố Cổ Hội An – Bà Nà – Rừng Dừa Bảy Mẫu",
      userName: "VietDuKy User",
      avatar: "https://i.pravatar.cc/40?img=1",
      daysAgo: 4,
      rating: 5,
      comment: `Thời gian đặt trước rất tuyệt để hạn chế số người vào bên trong. Chúng tôi có một khung giờ 7:30 tới thực sự tuyệt vời. Không có nhiều người nên chúng tôi đã tận hưởng khoảng thời gian của mình. Hình ảnh ở đây thật tuyệt vời và mê hoặc! Có rất nhiều tác phẩm nghệ thuật lớn và không gian tương tác. Nhìn chung, đây là một trong những nơi tuyệt vời nhất để ghé thăm ở Tokyo.`,
      images: [
        "https://i.imgur.com/1.jpg",
        "https://i.imgur.com/2.jpg",
        "https://i.imgur.com/3.jpg",
        "https://i.imgur.com/4.jpg",
        "https://i.imgur.com/5.jpg",
      ],
      likes: 1,
    },
    // Thêm các review khác nếu cần
  ];

const statusMap = {
  pending: { text: "Đang chờ duyệt bài", color: "text-blue-500" },
  approved: { text: "Bài đã được duyệt", color: "text-green-600" },
  locked: { text: "Bài đã bị khóa", color: "text-red-600" },
};

export default function ReviewTour() {
  const [activeTab, setActiveTab] = useState("review");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Danh sách đánh giá</h2>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Thêm bài viết
      </button>

      <ModalSharePost isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "review"
              ? "border-b-2 border-red-500 text-red-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Nhận xét
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "shared"
              ? "border-b-2 border-red-500 text-red-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("shared")}
        >
          Bài viết chia sẻ
        </button>
      </div>

      {activeTab === "review" &&
        reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-red-600 mb-2">
              {r.tourName}
            </h3>

            <div className="flex items-center mb-2">
              <img
                src={r.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="text-sm">
                <p className="font-semibold">{r.userName}</p>
                <p className="text-gray-400">{r.daysAgo} days ago</p>
              </div>
            </div>

            {/* Stars + Label */}
            <div className="flex items-center mb-2">
              {[...Array(r.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 mr-1" />
              ))}
              <span className="ml-2 text-sm font-medium text-green-700">
                Rất khuyến khích
              </span>
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">
              {r.comment}
            </p>

            {/* Images */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {r.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`img-${i}`}
                  className="h-24 object-cover rounded"
                />
              ))}
            </div>

            {/* Like */}
            <div className="flex items-center text-sm text-gray-500">
              <FaThumbsUp className="mr-2" />
              {r.likes} người thấy điều này hữu ích
            </div>
          </div>
        ))}

      {/* Bài viết chia sẻ */}
      {activeTab === "shared" &&
        sharedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow border mb-5"
          >
            <div className="text-sm font-medium mb-3">
              Trạng thái:{" "}
              <span className={`${statusMap[post.status].color}`}>
                {statusMap[post.status].text}
              </span>
            </div>

            <div className="flex gap-4">
              <img
                src={post.image}
                alt="preview"
                className="w-28 h-24 object-cover rounded-md"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  {post.title}
                </h3>

                <div className="text-sm text-gray-600 flex flex-wrap gap-4 mb-1">
                  <span>🗓️ Ngày viết: {post.date}</span>
                  <span>
                    <FaThumbsUp className="inline mr-1" />
                    {post.likes} người thấy điều này hữu ích
                  </span>
                </div>

                <p className="text-sm text-gray-500">Viết bởi: {post.author}</p>
              </div>

              {/* Icons */}
              <div className="flex flex-col justify-center gap-3 pr-2 text-gray-500">
                <FiEdit2
                  className="cursor-pointer hover:text-blue-500"
                  title="Sửa bài viết"
                />
                <FiExternalLink
                  className="cursor-pointer hover:text-blue-500"
                  title="Xem bài viết"
                />
              </div>
            </div>
          </div>
        ))}

      {/* Nhận xét (giữ nguyên phần cũ) */}
      {activeTab === "review" && (
        <p className="text-gray-500 text-center py-10">Chưa có nhận xét.</p>
      )}
    </div>
  );
}
