// auth.provider.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosUser from "../hook/axiosUser";
import Swal from "sweetalert2";
import axios from 'axios';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (userData: any) => void;
  isStatus: string;
}

// สร้าง Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// สร้าง Provider
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<string>("");

  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosUser.post(
        "users/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login success!!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await axiosUser.post("users/create", userData);
      
      if (response.status === 201) {
        setIsStatus("201");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register success!!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'swal-high-z-index',
          },
        });
      }
    } catch (error) {
      // ตรวจสอบว่า error เป็น AxiosError
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email already exists.",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'swal-high-z-index',
            },
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Server error! Please try again.",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'swal-high-z-index',
            },
          });
        }
        console.error(error.response.status);
      } else {
        // จัดการกรณีที่ error ไม่ใช่ AxiosError
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Unexpected error occurred!",
          showConfirmButton: true,
          customClass: {
            popup: 'swal-high-z-index',
          },
        });
        console.error(error);
      }
    }
  };
  

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout success!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register, isStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// สร้าง Hook สำหรับใช้ Context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
