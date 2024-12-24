/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { FaShieldAlt, FaArrowRight, FaBook } from "react-icons/fa"; 

const WhyPreservingHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Why Preserving History Matters
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Our shared history is a priceless treasure. Artifacts tell the stories of ancient civilizations, their cultures, and the lessons they've imparted to humanity. Preserving these artifacts allows us to bridge the past with the present, keeping history alive for future generations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white p-6 shadow-xl rounded-lg transition-transform transform hover:scale-105">
            <FaShieldAlt className="text-4xl text-blue-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Protecting Our Heritage
            </h3>
            <p className="text-gray-600 text-center">
              Every artifact is a piece of our collective identity. Protecting them ensures that our cultural legacy is safeguarded for future generations.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 shadow-xl rounded-lg transition-transform transform hover:scale-105">
            <FaBook className="text-4xl text-green-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Unlocking Knowledge
            </h3>
            <p className="text-gray-600 text-center">
              Each artifact holds valuable knowledge about our past. By studying them, we gain insights into the advancements, traditions, and struggles of ancient societies.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 shadow-xl rounded-lg transition-transform transform hover:scale-105">
            <FaArrowRight className="text-4xl text-pink-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Join the Preservation Effort
            </h3>
            <p className="text-gray-600 text-center">
              Your involvement in tracking and preserving these artifacts makes a difference. Explore, contribute, and ensure these treasures continue to inspire.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/all-artifacts"
            className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Exploring Artifacts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyPreservingHistory;
