import LoginForm from "../../components/LoginForm/LoginForm";
export default function LoginPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Background Image & Text */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative flex-col items-center justify-start pt-10"
        style={{
          backgroundImage:
            "url('https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-bien.jpg')",
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center p-10">
          <img src="/logo.png" alt="Logo" className="w-24 mb-4" />
          <h1 className="text-3xl font-bold uppercase leading-tight">
            RONG CHƠI BỐN PHƯƠNG, <br /> GIÁ VẪN &quot;YÊU THƯƠNG&quot;
          </h1>
        </div>
      </div>

      {/* Right Section - Background Image & Login Form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://free.vector6.com/wp-content/uploads/2021/03/E269-vector-trong-dong.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-80"></div>
        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
