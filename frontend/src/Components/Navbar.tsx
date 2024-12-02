import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineChair } from "react-icons/md";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useAuth } from "../AuthContext/auth.provider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import axiosUser from "../hook/axiosUser";
import MyComponent from "./MyComponent";
import { FiHeart } from "react-icons/fi";
import { BsBasket } from "react-icons/bs";
import Sidebar from "./Sidebar";
import { GiRunningShoe } from "react-icons/gi";

const Navbar = () => {
  const { login, user } = useAuth();
  const [select, setSelect] = useState<string>("Home");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const OpenModalLogin = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    const close = document.getElementById("Register") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      close.close();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    const close = document.getElementById("Login") as HTMLDialogElement;
    close.close();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const role = "customer";
    const userData = {
      email,
      password,
      name: userName,
      role,
    };

    try {
      const response = await axiosUser.post("users/create", userData);
      console.log(response.status);

      if (response.status === 201) {
        setIsShowRegister(false);
        setEmail("");
        setPassword("");
        setUserName("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register success!!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "swal-high-z-index",
          },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Email already exists.",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "swal-high-z-index",
          },
        });
        console.error(error.response.status);
      }
    }
  };

  return (
    <div
      className={` sm:pr-16 z-20 ${
        isHomePage ? "text-black  " : "bg-gray-800 text-white"
      }
     text-black py-6 px-5 w-full`}
    >
      <div className=" flex flex-row justify-between">
        <button
          onClick={() => navigate("/")}
          className="sm:flex-wrap font-bold text-3xl flex items-center justify-center gap-3"
        >
          <div>KS</div>
          <div>
            <GiRunningShoe />
          </div>
        </button>

        <div className="hidden lg:block xl:block ">
          <div className=" flex flex-row px-3 py-2 gap-2 items-center border bg-gray-800 bg-opacity-20 backdrop-blur-sm rounded-full">
            <Link
              to={"/"}
              onClick={() => setSelect("Home")}
              id="Home"
              className={`hover:bg-white hover:text-black px-3 py-1  
            rounded-full flex justify-center w-[110px]
            hover:shadow-lg transition duration-500 ease-in-out ${
              select == "Home" ? "bg-white text-black shadow-lg" : ""
            }`}
            >
              Home
            </Link>
            <Link
              to={"/"}
              onClick={() => setSelect("About-Us")}
              id="About-Us"
              className={`hover:bg-white hover:text-black px-3 py-1 rounded-full flex justify-center w-[110px]
                hover:shadow-lg transition duration-500 ease-in-out ${
                  select == "About-Us" ? "bg-white text-black shadow-lg" : ""
                }`}
            >
              About Us
            </Link>
            <Link
              to={"/"}
              onClick={() => setSelect("Services")}
              id="Services"
              className={`hover:bg-white hover:text-black px-3 py-1 rounded-full flex justify-center w-[110px]
                hover:shadow-lg transition duration-500 ease-in-out ${
                  select == "Services" ? "bg-white text-black shadow-lg" : ""
                }`}
            >
              Services
            </Link>
            <Link
              to={"/"}
              onClick={() => setSelect("Shop")}
              id="Shop"
              className={`hover:bg-white hover:text-black px-3 py-1 rounded-full flex justify-center w-[110px]
                hover:shadow-lg transition duration-500 ease-in-out ${
                  select == "Shop" ? "bg-white text-black shadow-lg" : ""
                }`}
            >
              Shop
            </Link>
            <Link
              to={"/"}
              onClick={() => setSelect("Contact-Us")}
              id="Contact-Us"
              className={`hover:bg-white hover:text-black px-3 py-1 rounded-full flex justify-center w-[110px]
                hover:shadow-lg transition duration-500 ease-in-out ${
                  select == "Contact-Us" ? "bg-white text-black shadow-lg" : ""
                }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
        {user ? (
          <div className="flex gap-5 justify-center items-center">
            <div>
              <Sidebar />
            </div>
            <div className="z-10">
              <motion.button whileTap={{ scale: 0.9 }}>
                <motion.div>
                  <div className="indicator">
                    <FiHeart className="text-2xl hover:text-red-500" />
                    <span className="badge badge-sm badge-error indicator-item text-white">
                      8
                    </span>
                  </div>
                </motion.div>
              </motion.button>
            </div>
            <div className="z-10 mx-2">
              <motion.button whileTap={{ scale: 0.9 }}>
                <motion.div>
                  <div className="indicator">
                    <BsBasket className="text-2xl" />
                    <span className=" badge badge-sm badge-error indicator-item text-white">
                      8
                    </span>
                  </div>
                </motion.div>
              </motion.button>
            </div>
            <div>
              <MyComponent />
            </div>
          </div>
        ) : (
          <div className=" flex gap-5 items-center ">
            <button
              onClick={() => setIsShowRegister(!isShowRegister)}
              className="w-[100px] px-2 py-2 rounded-full  hover:text-black hover:bg-white 
          transition duration-500 ease-in-out"
            >
              Register
            </button>

            <button
              onClick={() => {
                setIsShowRegister(false);
                OpenModalLogin("Login");
              }}
              className="w-[100px] px-2 py-2 rounded-full  hover:text-black hover:bg-white 
          transition duration-500 ease-in-out"
            >
              Login
            </button>
          </div>
        )}
      </div>

      <dialog id="Login" className="modal transition duration-500 ease-in-out">
        <div className="modal-box bg-gray-800 bg-opacity-50 backdrop-blur-md">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Login</h3>
          <div>
            <div className="flex flex-col gap-5 my-5">
              <form onSubmit={handleSubmit}>
                <label className="input my-5 bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </label>
                <label className="input bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={isShowPassword == false ? "password" : "text"}
                    className="grow"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {isShowPassword == true ? (
                    <button
                      type="button"
                      onClick={() => setIsShowPassword(false)}
                    >
                      <IoEyeOutline />
                    </button>
                  ) : (
                    isShowPassword == false && (
                      <button
                        type="button"
                        onClick={() => setIsShowPassword(true)}
                      >
                        <IoEyeOffOutline />
                      </button>
                    )
                  )}
                </label>
                <div className="label flex justify-end">
                  <span className="label-text-alt">
                    ยังไม่มีบัญชีผู้ใช้?
                    <button
                      className="ml-2 hover:text-blue-400"
                      onClick={() => {
                        setIsShowRegister(true);
                      }}
                    >
                      สร้างบัญชี
                    </button>
                  </span>
                </div>
                <button type="submit" className="w-full">
                  <div className="flex justify-center hover:bg-white hover:text-black items-center my-5 border rounded-full py-2 hover:scale-101 translate ease-in-out duration-300">
                    เข้าสู่ระบบ
                  </div>
                </button>
              </form>
            </div>
            <div className="border-t">
              <div className="flex flex-row my-5 justify-center gap-5">
                <FaGoogle className="text-4xl hover:scale-104" />
                <FaFacebook className="text-4xl hover:scale-104" />
                <FaInstagram className="text-4xl hover:scale-104" />
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {isShowRegister === true && (
        <div
          id="Register"
          className=" transition duration-500 ease-in-out relative z-10 w-full flex justify-center items-center my-5"
        >
          <div className="w-[500px] p-5 rounded-2xl bg-gray-800 bg-opacity-50 backdrop-blur-md">
            <button
              onClick={() => setIsShowRegister(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Register</h3>
            <div>
              <form onSubmit={handleRegister}>
                <div className="flex flex-col gap-5 mt-5">
                  <label className="input bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </label>
                  <label className="input bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type={isShowPassword == false ? "password" : "text"}
                      className="grow"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {isShowPassword == true ? (
                      <button
                        type="button"
                        onClick={() => setIsShowPassword(false)}
                      >
                        <IoEyeOutline />
                      </button>
                    ) : (
                      isShowPassword == false && (
                        <button
                          type="button"
                          onClick={() => setIsShowPassword(true)}
                        >
                          <IoEyeOffOutline />
                        </button>
                      )
                    )}
                  </label>
                  <label className="input bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="username"
                    />
                  </label>
                  <div className="label flex justify-end">
                    <span className="label-text-alt">
                      มีบัญชีแล้ว?
                      <button
                        type="button"
                        className="ml-2 hover:text-blue-400"
                        onClick={() => {
                          setIsShowRegister(false);
                          OpenModalLogin("Login");
                        }}
                      >
                        ล็อกอินเลย
                      </button>
                    </span>
                  </div>
                </div>
                <button type="submit" className="w-full">
                  <div className="flex justify-center hover:bg-white hover:text-black items-center mb-5 border rounded-full py-2 hover:scale-101 translate ease-in-out duration-300">
                    สมัครสมาชิก
                  </div>
                </button>
              </form>
              <div className="border-t">
                <div className="flex flex-row my-5 justify-center gap-5">
                  <FaGoogle className="text-4xl" />
                  <FaFacebook className="text-4xl" />
                  <FaInstagram className="text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
