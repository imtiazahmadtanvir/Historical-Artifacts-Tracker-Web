import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-center text-white p-6">
      {/* Error Icon */}
      <BiErrorCircle className="text-red-500 text-8xl mb-4 animate-pulse" />
      
      {/* Error Message */}
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-lg text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      
      {/* Back to Home Button */}
      <Link
        to="/"
        className="btn btn-primary px-6 py-3 text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;