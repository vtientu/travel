import { useState, useRef } from "react";

export default function Note() {
    const [openIndex, setOpenIndex] = useState(null);
    const contactRef = useRef(null);

    const notes = [
        { title: "Giá tour bao gồm",
            content: "- Vé máy bay khứ hồi #VALUES[start_location --> end_location]\n" +
                     "- Phòng khách sạn 4 sao chuẩn địa phương, tiêu chuẩn 2 khách/phòng\n" +
                     "- Bảo hiểm du lịch\n" +
                     "- Hướng dẫn viên VietDuKy nói tiếng Việt và đi theo suốt tuyến.\n" +
                     "Đặc biệt VietDuKy tặng thêm cho tất cả các du khách (đến 80 tuổi) phí Bảo Hiểm Du Lịch với mức bồi thường tối đa là 460.000.000 vnđ cho nhân mạng và 30.000.000 vnđ cho hành lý" },
        { title: "Giá tour không bao gồm",
            content: "- Hộ chiếu\n" +
                     "- Chi phí ăn uống cá nhân\n" +
                     "- Các chi phí khác không bao gồm trong giá: Nước uống bia rượu trong bữa ăn, điện thoại, giặt ủi, chi phí quá cước theo quy định của hàng không. Thuốc men, bệnh viện...và chi phí cá nhân khác ngoài chương trình.\n" +
                     "- Bảo hiểm du lịch đối với khách chỉ mua land tour ( không có vé máy bay xuất phát từ Việt Nam)\n" +
                     "- Chi phí dời ngày, đổi chặng, nâng hạng vé máy bay. Trường hợp Quý khách không sử dụng chặng đi của vé đoàn theo tour, các chặng nội địa và quốc tế còn lại sẽ bị hủy do điều kiện của hãng Hàng Không.\n" +
                     "- Tour áp dụng cho khách quốc tịch Việt Nam. Theo quy định của đối tác #VALUES[Location], khách quốc tịch nước ngoài (trừ khách Việt Kiều) sẽ phụ thu 1.000.000 vnd/khách.\n" +
                     "- Tiền bồi dưỡng cho Hướng dẫn viên và tài xế địa phương 100.000 vnd/khách/ngày (tương đương 4 usd/khách/ ngày)\n" +
                     "* Lưu ý: Nếu Quý Khách có nhu cầu tách đoàn, vui lòng thông báo cho nhân viên bán tour ngay tại thời điểm đăng ký tour, Quý khách sẽ thanh toán thêm chi phí là 1.500.000vnđ/khách/ngày." },
        { title: "Lưu ý giá trẻ em",
            content: "- Trẻ em dưới 2 tuổi : 30% giá tour người lớn\n" +
                     "- Trẻ em từ 2 tuổi dưới 12 tuổi : 90% giá tour người lớn (không có chế độ giường riêng, 100% giá tour người lớn sẽ có giường phụ)\n" +
                     "- Trẻ em từ 12 tuối trở lên: 100% giá tour người lớn" },
        { title: "Điều kiện thanh toán",
            content: "- Quý khách nộp hồ sơ và đặt cọc 50% chi phí dịch vụ và 100% chi phí phát sinh (nếu có) ngay khi đặt chỗ.\n" +
                     "- Quý khách thanh toán hết số tiền còn lại trước ngày khởi hành 10 ngày làm việc." },
        { title: "Điều kiện đăng ký",
            content: "- Hộ chiếu gốc của Quý khách còn hạn tối thiểu 06 tháng tính từ ngày về Việt Nam. Đồng thời, hộ chiếu phải còn tối thiểu ít nhất 3 trang trắng.\n" +
                     "- Giá trẻ em áp dụng từ 2 tuổi cho đến dưới 12 tuổi.\n" +
                     "- Khi đến đăng ký, Quý khách vui lòng mang hộ chiếu bản gốc và đóng cọc 50% giá tour\n" +
                     "- Nếu yêu cầu ở phòng đơn, Quý khách vui lòng thanh toán tiền phụ thu.\n" +
                     "- Nếu khách là Việt Kiều hoặc nước ngoài có visa rời phải mang theo lúc đi tour.\n" +
                     "- Quý khách mang 2 Quốc tịch hoặc Travel document (chưa nhập quốc tịch) vui lòng thông báo với nhân viên bán tour ngay thời điểm đăng ký tour và nộp bản gốc kèm các giấy tờ có liên quan (nếu có).\n" +
                     "- Quý khách chỉ mang thẻ xanh (thẻ tạm trú tại nước ngoài) và không còn hộ chiếu VN còn hiệu lực thì không đăng ký du lịch sang nước thứ ba được.\n" +
                     "- Quý khách dưới 18 tuổi phải có Bố Mẹ hoặc người nhà trên 18 tuổi đi cùng. Trường hợp đi với người nhà phải nộp kèm giấy ủy quyền được chính quyền địa phương xác nhận (được Bố Mẹ ủy quyến để dắt đi tour)\n" +
                     "- Khách nữ từ 55 tuổi trở lên và khách nam từ 60 trở lên: nên có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Riêng khách từ 70 tuổi trở lên: bắt buộc phải có người thân dưới 55 tuổi (đầy đủ sức khỏe)" +
                     " đi cùng. Ngoài ra, khách từ 75 tuổi trở lên khuyến khích đóng thêm phí bảo hiểm cao cấp. Không nhận khách từ 80 tuổi trở lên.\n" +
                     "- Quý khách mang thai vui lòng báo cho nhân viên bán tour ngay tại thời điểm đăng ký. Lưu ý phải có ý kiến của bác sĩ trước khi đi tour. Cam kết tự chịu trách nhiệm về sức khỏe của mình và thai nhi trong suốt thời gian tham gia chương trình du lịch.\n" +
                     "- VietDuKy miễn trừ trách nhiệm trong trường hợp khách tham gia tour bị từ chối hoặc không được phép xuất nhập cảnh vì lý do cá nhân, hoặc các vấn đề phát sinh từ việc tự xin visa nhập cảnh, việc sử dụng thẻ ABTC (APEC), hộ chiếu công vụ," +
                     " ngoại giao khi đi tour, hoặc trong trường hợp hồ sơ xin visa của Quý khách bị từ chối, bị kéo dài bởi cơ quan có thẩm quyền." },
        { title: "Lưu ý về chuyển hoặc hủy tour",
            content: "- Sau khi đóng tiền, nếu Quý khách muốn chuyển/huỷ tour xin vui lòng mang Vé Du Lịch đến văn phòng đăng ký tour để làm thủ tục chuyển/huỷ tour và chịu chi phí theo quy định của VietDuKy. Không giải quyết các trường hợp liên hệ chuyển/huỷ tour qua điện thoại.\n" +
                     "- Đối với những tour còn thời hạn hủy nhưng đã làm visa, Quý khách vui lòng thanh toán phí visa." },
        { title: "Các điều kiện hủy tour đối với ngày thường",
            content: "- Nếu hủy hoặc chuyển sang các tuyến du lịch khác trước ngày khởi hành 20: Không mất chi phí.\n" +
                     "- Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 15-19 ngày trước ngày khởi hành: Chi phí chuyển/ huỷ tour là 50% tiền cọc tour.\n" +
                     "- Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 12-14 ngày trước ngày khởi: Chi phí chuyển/huỷ tour là 100% tiền cọc tour.\n" +
                     "- Nếu hủy chuyến du lịch ngay sau khi Đại Sứ Quán, Lãnh Sự Quán đã cấp visa: Chi phí huỷ tour là 100% tiền cọc tour.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng từ 08-11 ngày trước ngày khởi hành: Chi phí huỷ tour là 50% trên giá tour du lịch.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng từ 05-07 ngày trước ngày khởi hành: Chi phí huỷ tour là 70% trên giá tour du lịch.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng từ 02-04 ngày trước ngày khởi hành: Chi phí huỷ tour là 90% trên giá vé du lịch.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành: Chi phí huỷ tour là 100% trên giá vé du lịch.\n" +
                     "*Thời gian hủy tour được tính cho ngày làm việc, không tính thứ bảy và chủ nhật\n" +
                     "* Các tour ngày lễ, tết là các tour có thời gian diễn ra rơi vào một trong các ngày lễ, tết theo qui định." },
        { title: "Các điều kiện hủy tour đối với ngày lễ, Tết",
            content: "- Nếu hủy hoặc chuyển sang các tuyến du lịch khác trước ngày khởi hành 30 ngày: Không mất chi phí.\n" +
                     "- Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 25-29 ngày trước ngày khởi hành: Chi phí chuyển/huỷ tour là 50% tiền cọc tour.\n" +
                     "- Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 20-24 ngày trước ngày khởi hành: Chi phí chuyển/huỷ tour là 100% tiền cọc tour.\n" +
                     "- Nếu hủy chuyến du lịch ngay sau khi Đại Sứ Quán, Lãnh Sự Quán đã cấp visa: Chi phí huỷ tour là 100% tiền cọc tour.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng từ 17-19 ngày trước ngày khởi hành: Chi phí huỷ tour là 50% trên giá tour du lịch." +
                     "- Nếu hủy chuyến du lịch trong vòng từ 08-16 ngày trước ngày khởi: Chi phí huỷ tour là 70% trên giá tour du lịch.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng từ 02-07 ngày trước ngày khởi: Chi phí huỷ tour là 90% trên giá vé du lịch.\n" +
                     "- Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí huỷ tour là 100% trên giá vé du lịch.\n" +
                     "* Thời gian hủy tour được tính cho ngày làm việc, không tính thứ bảy, chủ nhật và các ngày Lễ, Tết." },
        { title: "Trường hợp bất khả kháng",
            content: "Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì một lý do bất khả kháng như hỏa hoạn, thời tiết, tai nạn, thiên tai," +
                     " chiến tranh, dịch bệnh, hoãn, dời, hủy chuyến hoặc thay đổi khác của các phương tiện vận chuyển công cộng hoặc các sự kiện bất khả kháng khác theo quy định pháp luật …)," +
                     " thì VietDuKy sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý nào. Tuy nhiên, mỗi bên có trách nhiệm cố gắng tối đa để giúp" +
                     " đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng. Việc hoàn tiền dịch vụ trong trường hợp hủy tour do sự kiện bất khả kháng sẽ tùy thuộc vào quy định và" +
                     " điều kiện của các đối tác cung ứng dịch vụ, thời gian hoàn tiền (nếu có ) từ 60 - 90 ngày\n" },
        {
            title: "Liên hệ",
            content: "Chương trình có thể thay đổi tùy vào tình hình thực tế.\n" +
                     "Mọi chi tiết xin vui lòng liên hệ: (+84) xx.xx.xx.xx/ xxxx.xxxx\n" +
                     "[Địa chỉ]\n" +
                     "KÍNH CHÚC QUÝ KHÁCH MỘT CHUYẾN DU LỊCH VUI VẺ & THÚ VỊ!"
        },
    ];

    return (
        <div className="relative col-span-2 bg-white shadow-lg bg-opacity-20 p-4 rounded-lg mt-4 border border-gray-300">
            <h2 className="text-center text-lg font-bold mb-4">Những thông tin cần lưu ý</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer relative"
                        ref={note.title === "Liên hệ" ? contactRef : null}
                    >
                        <div
                            className="flex justify-between items-center"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <h3 className="font-semibold text-gray-700">{note.title}</h3>
                            <span className="text-gray-500">{openIndex === index ? "▲" : "▼"}</span>
                        </div>

                        {openIndex === index && (
                            <div className="absolute w-full left-0 top-full mt-2 p-3 border border-gray-300 rounded-lg shadow-lg bg-[#F9FAFB] z-50">
                                {note.content.split("\n").map((line, i) => (
                                    <p key={i} className="text-gray-700">{line}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
