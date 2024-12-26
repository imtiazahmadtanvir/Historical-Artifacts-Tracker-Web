import { useLoaderData } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AllArtifactsPage = () => {
  const initialArtifacts = useLoaderData();
  const [artifacts, setArtifacts] = useState(initialArtifacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/search?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setArtifacts(data);
    } catch (error) {
      console.error('Search Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
      </header>

      <section className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            All Artifacts
          </h2>

          {/* Search Input */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search artifacts by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-l-md"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              <FaSearch />
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-gray-600">Searching...</p>
          )}

          {/* Display Artifacts */}
          {!artifacts || artifacts.length === 0 ? (
            <p className="text-center text-gray-600">
              No artifacts found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artifacts.map((artifact) => (
                <div
                  key={artifact._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <img
                    src={artifact.artifactImage || default_Img}
                    alt={artifact.artifactName || 'Artifact'}
                    className="w-full h-40 object-cover"
                    onError={(e) => (e.target.src = default_Img)}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {artifact.artifactName}
                    </h3>
                    <p className="text-gray-600 text-sm truncate">
                      {artifact.historicalContext || 'No description available.'}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-red-500" />
                        <span>{artifact.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt />
                        <span>{artifact.discoveredAt || 'Unknown'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/artifact/${artifact._id}`)}
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

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AllArtifactsPage;
