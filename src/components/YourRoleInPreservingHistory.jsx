import { Link } from "react-router-dom";
import { FaUsers, FaSearch, FaHandsHelping } from "react-icons/fa"; // Icons for community, discovery, and contribution

const YourRoleInPreservingHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Your Role in Preserving History
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          History is not only about what has been left behind; it’s about what we do today to protect, learn from, and share the stories of the past. By getting involved in preserving and tracking historical artifacts, you become part of a global movement that ensures the past lives on for generations to come.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white p-6 shadow-xl rounded-lg transition-transform transform hover:scale-105">
            <FaUsers className="text-4xl text-blue-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Join a Global Community
            </h3>
            <p className="text-gray-600 text-center">
              Be part of a worldwide community dedicated to the preservation and celebration of history. Together, we can protect our cultural heritage.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 shadow-xl rounded-lg transition-transform transform hover:scale-105">
            <FaSearch className="text-4xl text-green-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Discover Hidden Treasures
            </h3>
            <p className="text-gray-600 text-center">
              Every artifact holds untold stories waiting to be discovered. Dive into history and uncover the secrets of ancient civilizations.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white p-6 shadow-xl rounded-lg transition-transform transform hover:scale-105">
            <FaHandsHelping className="text-4xl text-pink-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Make a Difference
            </h3>
            <p className="text-gray-600 text-center">
              Your efforts in preserving history can have a lasting impact. Whether it’s through donations, contributions, or spreading awareness, every action counts.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/get-involved"
            className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Involved Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default YourRoleInPreservingHistory;
