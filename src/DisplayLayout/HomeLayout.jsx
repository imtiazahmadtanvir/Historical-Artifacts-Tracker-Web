import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FeaturedArtifacts from "../components/FeaturedArtifacts";
import WhyPreservingHistory from "../components/WhyPreservingHistory";
import YourRoleInPreservingHistory from "../components/YourRoleInPreservingHistory";
import { FaSun, FaMoon } from "react-icons/fa";

const HomeLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex flex-col min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="mt-14">
        <Navbar />
      </header>

      {/* Dark Mode Toggle Button */}
      <div className="fixed top-5 right-1 md:right-12 lg:right-2 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="lg:p-3 md:p-3 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Main Content */}
      <div className="text-gray-800 dark:text-white">
        <Banner />
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 transition-all">
        <FeaturedArtifacts />
        <WhyPreservingHistory />
        <YourRoleInPreservingHistory />
      </div>

      <main className="flex-grow transition-all duration-500">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-900 transition-all duration-500">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
