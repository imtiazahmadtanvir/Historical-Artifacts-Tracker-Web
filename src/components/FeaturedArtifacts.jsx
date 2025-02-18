import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import default_Img from "../assets/bg4.jpg";

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostLikedArtifacts = async () => {
      try {
        const response = await fetch(
          "https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/most-liked"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch most liked artifacts");
        }
        const data = await response.json();
        setArtifacts(data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMostLikedArtifacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Loading Artifacts...
        </p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Featured Artifacts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artifacts.map((artifact) => (
            <div
              key={artifact._id}
              className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 dark:bg-gray-800"
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={artifact.artifactImage || default_Img}
                  alt={artifact.artifactName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 text-center dark:text-white truncate">
                  {artifact.artifactName}
                </h3>
                <p className="text-gray-700 text-center text-sm mt-2 line-clamp-2 dark:text-white">
                  {artifact.historicalContext || "No description available."}
                </p>
                <div className="flex items-center justify-between mt-3 text-gray-700 dark:text-white">
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-gray-500 dark:text-white" />
                    <span className="font-bold">{artifact.likes}</span>
                  </div>
                  <Link
                    to={`/artifact/${artifact._id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/all-artifacts"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors dark:bg-yellow-500 dark:text-white dark:hover:bg-gray-600"
          >
            See All Artifacts <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtifacts;
