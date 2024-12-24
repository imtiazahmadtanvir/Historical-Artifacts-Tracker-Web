import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../assets/logo.jpg"; // Replace with your actual logo path
import defaultPic from "../assets/defulteimage.png"; // Default image for user avatar
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between bg-base-200 dark:bg-gray-900 shadow-lg px-5 py-3 text-gray-800 dark:text-gray-200">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img src={logo} alt="Historical Artifacts Tracker Logo" className="w-10 h-10 mr-3" />
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
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
        <Link to="/add-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
          Add Artifact
        </Link>
        <Link to="/liked-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
          Liked Artifacts
        </Link>
        <Link to="/my-artifacts" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
          My Artifacts
        </Link>
      </div>

      {/* User Profile or Login/Register (Large Devices) */}
      <div className="hidden lg:flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              <img
                src={user?.photoURL || defaultPic}
                alt={user?.name || "User"}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
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
            <Link
              to="/auth/login"
              className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu for Medium/Small Devices */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-[4rem] right-0 bg-base-100 dark:bg-gray-800 shadow-lg z-50">
          <div className="flex flex-col items-start gap-2 p-4">
            <Link
              to="/"
              className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/all-artifacts"
              className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              All Artifacts
            </Link>
            <Link
              to="/add-artifacts"
              className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Add Artifact
            </Link>
            <Link
              to="/liked-artifacts"
              className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Liked Artifacts
            </Link>
            <Link
              to="/my-artifacts"
              className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              My Artifacts
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="btn btn-ghost w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={logOut}
                  className="btn btn-primary w-full text-center bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="btn btn-primary w-full text-center bg-yellow-400 hover:bg-yellow-500"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-primary w-full text-center bg-yellow-400 hover:bg-yellow-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
