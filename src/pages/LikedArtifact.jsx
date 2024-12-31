import { useLoaderData } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const LikedArtifact = () => {
  const initialLikedData = useLoaderData(); // Get initial liked data from loader
  const [likeddata] = useState(initialLikedData || []); // Ensure a default empty array
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get logged-in user data

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <section className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Liked Artifacts
          </h2>

          {/* Display Artifacts */}
          {likeddata.adderEmail?.toLowerCase() === user.email?.toLowerCase()} || {likeddata.length === 0 ? (
            <p className="text-center text-gray-600">
              No liked artifacts found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likeddata.map((data) => (
                <div
                  key={data._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  {/* Artifact Image */}
                  <img
                    src={data.artifactImage || default_Img}
                    alt={data.artifactName || 'Artifact'}
                    className="w-full h-40 object-cover"
                    onError={(e) => (e.target.src = default_Img)}
                  />

                  {/* Artifact Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {data.artifactName || 'Unknown Artifact'}
                    </h3>
                    <p className="text-gray-600 text-sm truncate">
                      {data.historicalContext || 'No description available.'}
                    </p>

                    {/* Metadata Section */}
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-red-500" />
                        <span>{data.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt />
                        <span>{data.discoveredAt || 'Unknown Date'}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/all-artifacts`)}
                      className="flex items-center mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LikedArtifact;
