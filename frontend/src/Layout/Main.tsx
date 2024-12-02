import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>
      <footer className="mt-auto"> 
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
