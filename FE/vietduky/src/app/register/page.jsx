"use client"
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex h-screen w-full">
            {/* Left Section - Background Image & Text */}
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center relative flex-col items-center justify-start pt-10"
                style={{ backgroundImage: "url('https://i.pinimg.com/736x/5e/c4/a3/5ec4a3b3713a93c2fbc44d60a54764fb.jpg')" }}
            >
                <div className="absolute inset-0 "></div>
                <img src="/logo.png" alt="Logo" className="w-24 mb-4" />
                <div className="relative z-10 text-white text-center w-full px-10">
                    <h1 className="text-3xl font-bold uppercase leading-tight">
                        RONG CHƠI BỐN PHƯƠNG, <br /> GIÁ VẪN "YÊU THƯƠNG"
                    </h1>
                </div>
            </div>

            {/* Right Section - Background Image & Register Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center relative bg-cover bg-center"
                style={{ backgroundImage: "url('https://free.vector6.com/wp-content/uploads/2021/03/E269-vector-trong-dong.jpg')" }}
            >
                <div className="absolute inset-0 bg-white bg-opacity-80"></div>
                <div className="relative z-10">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}