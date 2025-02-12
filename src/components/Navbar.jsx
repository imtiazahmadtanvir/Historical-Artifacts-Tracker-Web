import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.jpg"; // Update with actual logo path
import defaultPic from "../assets/defulteimage.png"; // Default user avatar
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply dark mode class to HTML tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className={`fixed top-0 left-0 w-full ${darkMode ? "bg-gray-900" : "bg-white"} text-gray-900 dark:text-gray-100 shadow-lg z-50 transition-colors duration-300`}>
      <div className="container mx-auto py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center ml-3">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2 rounded-lg" />
          <Link to="/" className="text-xl font-bold">
            Historical Artifacts Tracker
          </Link>
        </div>

        {/* Navigation Links (Large Devices) */}
        <div className="hidden lg:flex gap-5">
          <Link to="/" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
            Home
          </Link>
          <Link to="/all-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
            All Artifacts
          </Link>
          {user && (
            <>
              <Link to="/add-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
                Add Artifact
              </Link>
              <Link to="/liked-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
                Liked Artifacts
              </Link>
              <Link to="/my-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
                My Artifacts
              </Link>
            </>
          )}
        </div>

        {/* User Profile or Login/Register */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <img
                  src={user?.photoURL || defaultPic}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-500"
                />
              </Link>
              <button
                onClick={logOut}
                className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition">
                Login
              </Link>
              <Link to="/auth/register" className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden btn btn-ghost"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className={`absolute top-[4.5rem] right-0 w-40 ${darkMode ? "bg-gray-900" : "bg-white"} shadow-lg z-50 lg:hidden`}>
          <div className="flex flex-col items-start gap-2 p-4">
            <Link to="/" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link to="/all-artifacts" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
              All Artifacts
            </Link>
            {user && (
              <>
                <Link to="/add-artifacts" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  Add Artifact
                </Link>
                <Link to="/liked-artifacts" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  Liked Artifacts
                </Link>
                <Link to="/my-artifacts" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  My Artifacts
                </Link>
                <Link to="/profile" className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                  Profile
                </Link>
                <button
                  onClick={logOut}
                  className="btn btn-primary w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/auth/login" className="btn btn-primary w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600">
                  Login
                </Link>
                <Link to="/auth/register" className="btn btn-primary w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600">
                  Register
                </Link>
              </>
            )}
            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-ghost w-full hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
cl