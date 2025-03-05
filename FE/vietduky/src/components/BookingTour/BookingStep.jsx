const BookingHeader = () => {
  return (
    <div className="w-full flex flex-col items-center py-4 bg-white ">
      {/* Header Title */}
      <div className="relative w-[90rem] h-[65px] gap-[1.5rem] flex items-center justify-between">
        {/* Nút Quay lại */}
        <div className="flex items-center gap-2 cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.47 12.53C5.33 12.39 5.25 12.2 5.25 12s.08-.39.22-.53l4-4a1.002 1.002 0 011.41 1.41L7.81 11.25H18a1 1 0 110 2H7.81l3.62 3.62a1 1 0 11-1.41 1.41l-4-4z"
              fill="black"
            />
          </svg>
          <span className="text-neutral-900 text-base font-normal font-['Be Vietnam Pro']">Quay lại</span>
        </div>

        {/* Tiêu đề Đặt tour */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[20.5px] text-[#a80f21] text-4xl font-bold font-['Be Vietnam Pro']">
          Đặt tour
        </div>
      </div>

      {/* Progress Steps */}
      <div className="w-[58.125rem] h-[117px] p-[0.875rem] flex justify-between items-center mt-4">
        {/* Bước 1: Nhập thông tin */}
        <div className="flex flex-col items-center gap-[15px]">
          <div className="w-8 h-8 rounded-full bg-[#a80f21] flex items-center justify-center text-white font-bold">1</div>
          <div className="text-[#a80f21] text-base font-bold font-['Be Vietnam Pro']">Nhập thông tin</div>
        </div>

        {/* Icon tiến trình */}
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.68503 9.913H13.952V8.36399C13.952 7.62399 14.994 7.227 15.659 7.715L21.303 11.851C21.773 12.195 21.773 12.805 21.303 13.149L15.659 17.285C14.994 17.773 13.952 17.377 13.952 16.636V15.087H4.68503C4.11603 15.087 3.65503 14.701 3.65503 14.225V10.775C3.65503 10.299 4.11603 9.913 4.68503 9.913Z" fill="#B1B1B1"/>
        </svg>

        {/* Bước 2: Thanh toán */}
        <div className="flex flex-col items-center gap-[15px]">
          <div className="w-8 h-8 rounded-full bg-[#b1b1b1] flex items-center justify-center text-white font-bold">2</div>
          <div className="text-[#b1b1b1] text-base font-bold font-['Be Vietnam Pro']">Thanh toán</div>
        </div>

        {/* Icon tiến trình */}
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.11496 9.913H13.382V8.36399C13.382 7.62399 14.424 7.227 15.089 7.715L20.733 11.851C21.203 12.195 21.203 12.805 20.733 13.149L15.089 17.285C14.424 17.773 13.382 17.377 13.382 16.636V15.087H4.11496C3.54596 15.087 3.08496 14.701 3.08496 14.225V10.775C3.08496 10.299 3.54596 9.913 4.11496 9.913Z" fill="#B1B1B1"/>
        </svg>

        {/* Bước 3: Hoàn tất */}
        <div className="flex flex-col items-center gap-[15px]">
          <div className="w-8 h-8 rounded-full bg-[#b1b1b1] flex items-center justify-center text-white font-bold">3</div>
          <div className="text-[#b1b1b1] text-base font-bold font-['Be Vietnam Pro']">Hoàn tất</div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
