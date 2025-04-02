export default function Footer() {
  return (
    <footer className="bg-[#A8111A] text-white py-14 w-full bottom-0">
      <div className="w-5/6 mx-auto px-4 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <h3 className="text-xl font-semibold">Về Việt Du Ký</h3>
          <p className="text-sm mt-2">
            Việt Du Ký là nền tảng trực tuyến tiên phong trong việc sử dụng trí
            tuệ nhân tạo (AI) để tạo ra lịch trình du lịch cá nhân hóa.
          </p>
        </div>

        <div className="col-span-2 col-start-5">
          <h3 className="text-xl font-semibold">Liên hệ</h3>
          <p className="text-sm flex items-center mt-2">
            <img src="/Image/Symbol1.png" alt="Địa chỉ" className="mr-4" />
            Hòa Lạc, Hà Nội
          </p>
          <p className="text-sm flex items-center mt-1">
            <img src="/Image/Symbol3.png" alt="SĐT" className="mr-4" />
            +84 868 884 528
          </p>
          <p className="text-sm flex items-center mt-1">
            <img src="/Image/Symbol4.png" alt="Email" className="mr-4" />
            vietduky.tour@gmail.com
          </p>
        </div>

        <div className="col-span-2 col-start-8">
          <h3 className="text-xl font-semibold">Mạng xã hội</h3>
          <div className="flex space-x-4 mt-2">
            <img src="/Image/Symbol.png" alt="Facebook" />
            <img src="/Image/Symbol2.png" alt="Tiktok" />
          </div>
        </div>

        <div className="col-span-3 col-start-10">
          <h3 className="text-xl font-semibold">Tra cứu Booking</h3>
          <input
            type="text"
            placeholder="Nhập mã booking của quý khách"
            className="w-full px-3 py-2 mt-2 text-sm rounded-3xl text-gray-700"
          />
          <button className="w-full mt-2 p-2 text-sm border rounded-3xl text-white">
            Tra cứu
          </button>
        </div>
      </div>
    </footer>
  );
}
