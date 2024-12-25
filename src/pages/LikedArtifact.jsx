import { Link, useLoaderData } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';

const LikedArtifact = () => {
  const artifacts = useLoaderData(); // Data fetched from the loader

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <section className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Liked Artifacts</h2>

          {/* No Artifacts State */}
          {!artifacts || artifacts.length === 0 ? (
            <p className="text-gray-600 text-lg">You haven't liked any artifacts yet. Start exploring and like some artifacts to see them here!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artifacts.map((artifact) => (
                <div
                  key={artifact._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  {/* Artifact Image */}
                  <img
                    src={artifact.artifactImage || default_Img}
                    alt={artifact.artifactName || 'Artifact Image'}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = default_Img;
                    }}
                  />

                  {/* Artifact Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
                      {artifact.artifactName || 'Unknown Artifact'}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 mb-4 truncate">
                      {artifact.historicalContext || 'No historical context available.'}
                    </p>

                    {/* Likes & Discovered At */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FaHeart className="text-red-500" />
                        <span>{artifact.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt />
                        <span>{artifact.discoveredAt || 'Unknown'}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/artifact/${artifact._id}`}
                      className="flex items-center mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
      </footer>
    </div>
  );
};

export default LikedArtifact;
