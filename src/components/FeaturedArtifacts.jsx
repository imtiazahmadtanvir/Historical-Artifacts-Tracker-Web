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
        const response = await fetch("http://localhost:5000/artifacts/most-liked");
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

  console.log(artifacts); // Check the artifacts state


  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold text-gray-700">Loading Artifacts...</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Featured Artifacts
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {artifacts.map((artifact) => (
          <div
            key={artifact._id}
            className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2"
          >
            <img
              src={artifact.artifactImage || default_Img}
              alt={artifact.artifactName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {artifact.artifactName}
              </h3>
              <p className="text-gray-700 text-center text-sm mt-2 truncate">
                {artifact.historicalContext || "No description available."}
              </p>
              <div className="flex items-center justify-between mt-3 text-gray-700">
                <div className="flex items-center gap-1">
                  <FaHeart className="text-gray-500" />
                  <span className="font-bold">{artifact.likes}</span>
                </div>
                <Link
                  to={`/artifact/${artifact._id}`}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
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
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
        >
          See All Artifacts <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArtifacts;
