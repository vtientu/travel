import ModalSharePost from "./ModalSharePost";
import { FeedbackService } from "@/services/API/feedback.service";
import { PostExperienceService } from "@/services/API/post_experience.service";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FiEdit2, FiExternalLink } from "react-icons/fi";

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


const statusMap = {
  pending: { text: "Đang chờ duyệt bài", color: "text-blue-500" },
  approved: { text: "Bài đã được duyệt", color: "text-green-600" },
  locked: { text: "Bài đã bị khóa", color: "text-red-600" },
};

export default function ReviewTour() {
  const [activeTab, setActiveTab] = useState("review");
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
//   const [sharedPosts, setSharedPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await FeedbackService.getFeedbackByUserId(user?.id);
        setReviews(response.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    // const fetchPosts = async () => {
    //   try {
    //     const response = await PostExperienceService.getAllPostExperience();
    //     setSharedPosts(response.data.data);
    //   } catch (error) {
    //     console.error("Error fetching posts:", error);
    //   }
    // };

    // fetchPosts();
    fetchReviews();
  }, [user?.id]);  

  const getRecommendationText = (rating) => {
    switch (rating) {
      case 5:
        return "Rất khuyến khích";
      case 4:
        return "Khuyến khích";
      case 3:
        return "Trung bình";
      case 2:
        return "Không khuyến khích";
      case 1:
        return "Rất không khuyến khích";
      default:
        return "";
    }
  };

  const ratingColors = {
    5: "text-green-600",
    4: "text-blue-500",
    3: "text-yellow-500",
    2: "text-orange-500",
    1: "text-red-500",
  };

  console.log("Reviews:", reviews);

  return (
    <div className=" mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Danh sách đánh giá</h2>
        <button
          className="bg-red-500 text-white px-4 py-1.5 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Thêm bài viết đánh giá
        </button>
      </div>

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
        reviews.map((review) => {
          const feedbackDate = new Date(review.feedback_date);
          const currentDate = new Date();

          // Tính số mili giây đã qua
          const differenceInTime = currentDate - feedbackDate;

          // Tính số ngày và giờ
          const differenceInDays = Math.floor(
            differenceInTime / (1000 * 3600 * 24)
          );
          const differenceInHours = Math.floor(
            (differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600)
          );

          let timeAgo;
          if (differenceInDays > 0) {
            timeAgo = `${differenceInDays} days ago`;
          } else {
            timeAgo = `${differenceInHours} hours ago`;
          }

          //     const feedbackDate = new Date(review.feedback_date);
          //   const currentDate = new Date();

          //   // Tính số ngày đã qua
          //   const differenceInTime = currentDate - feedbackDate;
          //   const differenceInDays = Math.floor(
          //     differenceInTime / (1000 * 3600 * 24)
          //   );
          return (
            <div
              key={review.feedback_id}
              className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-red-600 mb-2">
                {review?.tour?.name_tour}
              </h3>

              <div className="flex items-center mb-2">
                <img
                  src={review?.user?.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="text-sm">
                  <p className="font-semibold">{review?.user?.displayName}</p>
                  <p className="text-gray-400">{timeAgo}</p>
                </div>
              </div>

              {/* Stars + Label */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 mr-1 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span
                  className={`ml-2 text-sm font-medium ${
                    ratingColors[review.rating]
                  }`}
                >
                  {getRecommendationText(review.rating)}
                </span>
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">
                {review.description_feedback}
              </p>

              {/* Images */}
              {/* <div className="grid grid-cols-5 gap-2 mb-3">
        {r.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`img-${i}`}
            className="h-24 object-cover rounded"
          />
        ))}
      </div> */}

              {/* Like */}
              <div className="flex items-center text-sm text-gray-500">
                <FaThumbsUp className="mr-2" />
                {review.likes} người thấy điều này hữu ích
              </div>
            </div>
          );
        })}

      {/* Bài viết chia sẻ */}
      {activeTab === "shared" &&
        sharedPosts.map((post) => {
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
          </div>;
        })}
    </div>
  );
}
