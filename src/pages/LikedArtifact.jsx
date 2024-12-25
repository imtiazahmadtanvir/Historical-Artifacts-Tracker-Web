import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';

const LikedArtifacts = () => {
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Liked Artifacts from Local Storage
  useEffect(() => {
    try {
      const storedArtifacts = JSON.parse(localStorage.getItem('likedArtifacts')) || [];
      setLikedArtifacts(storedArtifacts);
    } catch (err) {
      setError('Failed to load liked artifacts from local storage');
    }
  }, []);

  // Handle Navigation to Individual Artifact Details Page
  const handleViewDetails = (id) => {
    navigate(`/artifacts/${id}`);
  };

  // Clear Liked Artifacts
  const handleClearLikes = () => {
    localStorage.removeItem('likedArtifacts');
    setLikedArtifacts([]);
  };

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="container  mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Liked Artifacts</h2>

        {likedArtifacts.length === 0 ? (
          <p className="text-center text-gray-500">No liked artifacts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedArtifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="bg-white border rounded-lg shadow-md p-4 flex flex-col"
              >
                <img
                  src={artifact.artifactImage || default_Img}
                  alt={artifact.artifactName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{artifact.artifactName}</h3>
                <p className="text-gray-600 mb-2"><strong>Type:</strong> {artifact.artifactType}</p>
                <p className="text-gray-600 mb-2"><strong>Likes:</strong> {artifact.likes || 0}</p>
                <button
                  onClick={() => handleViewDetails(artifact._id)}
                  className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Clear All Liked Artifacts Button */}
        {likedArtifacts.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleClearLikes}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
            >
              Clear All Likes
            </button>
          </div>
        )}
      </div>

      <footer className='mt-8'>
          <Footer className="bottom-0  left-0 w-full z-50 bg-base-200" />
      </footer>    
      </div>
  );
};

export default LikedArtifacts;
