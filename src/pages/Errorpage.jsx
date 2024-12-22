import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      {/* Error Icon */}
      <div className="text-red-500 text-6xl mb-4">
        <i className="fas fa-exclamation-triangle"></i>
      </div>

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page youre looking for doesnt exist.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Errorpage;
