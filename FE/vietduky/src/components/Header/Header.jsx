export default function Header() {
  return (
    <header className="bg-red-700 text-white py-4 px-6 flex items-center justify-between">
      <img src="/Image/Logo.png" alt="Viet Du Ky" width={150} height={100} />
      <div className="flex items-center space-x-6">
        <nav className="flex space-x-16">
          <a href="/" className="hover:underline text-white">
            Trang Chủ
          </a>
          <a href="#" className="hover:underline text-white">
            Du lịch trọn gói
          </a>
          <a href="#" className="hover:underline text-white">
            Hợp tác với chúng tôi
          </a>
          <a href="#" className="hover:underline text-white">
            Hỗ Trợ
          </a>
        </nav>
        <img
          src="/Image/avatar.png"
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
