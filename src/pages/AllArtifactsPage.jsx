import { useLoaderData } from "react-router-dom";
import { FaArrowRight, FaHeart, FaCalendarAlt, FaSearch, FaSort } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import default_Img from "../assets/bg4.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AllArtifactsPage = () => {
  const initialArtifacts = useLoaderData();
  const [artifacts, setArtifacts] = useState(initialArtifacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("none");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/search?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setArtifacts(data);
    } catch (error) {
      console.error("Search Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (option) => {
    let sortedArtifacts = [...artifacts];
    if (option === "votes-asc") {
      sortedArtifacts.sort((a, b) => (a.likes || 0) - (b.likes || 0));
    } else if (option === "votes-desc") {
      sortedArtifacts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    setSortOption(option);
    setArtifacts([...sortedArtifacts]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <header className="mt-14">
        <Navbar />
      </header>
      
      <section className="flex-grow py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            All Artifacts
          </h2>

          <div className="flex flex-col sm:flex-col justify-between items-center mb-8 gap-4 text-black dark:text-white">
            <div className="flex w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search artifacts by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700"
              />
              <button
                onClick={handleSearch}
                className="p-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                <FaSearch />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-600 dark:text-white" />
              <select
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              >
                <option value="none">Sort By</option>
                <option value="votes-asc">Votes (Ascending)</option>
                <option value="votes-desc">Votes (Descending)</option>
              </select>
            </div>
          </div>

          {loading && <p className="text-center text-gray-600 dark:text-white">Searching...</p>}

          {!artifacts || artifacts.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-white">
              No artifacts found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artifacts.map((artifact) => (
                <div
                  key={artifact._id}
                  className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col h-full"
                >
                  <img
                    src={artifact.artifactImage || default_Img}
                    alt={artifact.artifactName || "Artifact"}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.src = default_Img)}
                  />
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      {artifact.artifactName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm truncate flex-grow">
                      {artifact.historicalContext || "No description available."}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mt-3">
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-" />
                        <span>{artifact.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt />
                        <span>{artifact.discoveredAt || "Unknown"}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/artifact/${artifact._id}`)}
                      className="flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-sm font-medium"
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