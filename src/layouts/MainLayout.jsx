import { Outlet, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content with padding to prevent navbar overlap */}
      <main className="flex-grow pt-24 md:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;