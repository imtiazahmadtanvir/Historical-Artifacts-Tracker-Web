import { Link } from "react-router-dom";
import { FaUsers, FaSearch, FaHandsHelping } from "react-icons/fa"; // Icons for community, discovery, and contribution

const YourRoleInPreservingHistory = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Your Role in Preserving History
        </h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-white mb-12">
          History is not only about what has been left behind; it’s about what we do today to protect, learn from, and share the stories of the past. By getting involved in preserving and tracking historical artifacts, you become part of a global movement that ensures the past lives on for generations to come.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg w-full max-w-md mx-auto transition-transform transform hover:scale-105">
            <FaUsers className="text-4xl text-blue-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Join a Global Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Be part of a worldwide community dedicated to the preservation and celebration of history. Together, we can protect our cultural heritage.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg w-full max-w-md mx-auto transition-transform transform hover:scale-105">
            <FaSearch className="text-4xl text-green-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Discover Hidden Treasures
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Every artifact holds untold stories waiting to be discovered. Dive into history and uncover the secrets of ancient civilizations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg w-full max-w-md mx-auto transition-transform transform hover:scale-105">
            <FaHandsHelping className="text-4xl text-pink-500 mb-4 transition-transform transform hover:scale-125" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Make a Difference
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Your efforts in preserving history can have a lasting impact. Whether it’s through donations, contributions, or spreading awareness, every action counts.
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12">
          <Link
            to="/all-artifacts"
            className="inline-block bg-yellow-400 text-black dark:text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 dark:hover:bg-blue-700 transition-colors"
          >
            Get Involved Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default YourRoleInPreservingHistory;
