import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';

const ArtifactDetails = () => {
  const { id } = useParams(); // Extract artifact ID from URL params
  const [artifact, setArtifact] = useState(null); // State to store artifact details
  const [isLiking, setIsLiking] = useState(false); // Prevent multiple like requests
  const [error, setError] = useState(null); // State for handling errors

  // ✅ Fetch Artifact Details by ID
  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await fetch(`http://localhost:5000/artifacts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artifact details');
        }
        const data = await response.json();
        setArtifact(data);
      } catch (err) {
        console.error('Error fetching artifact:', err);
        setError('Failed to fetch artifact details');
      }
    };

    fetchArtifact();
  }, [id]);

  // ✅ Handle Like Button Click
  const handleLike = async () => {
    if (isLiking) return; // Prevent spam clicking
    setIsLiking(true);

    try {
      const response = await fetch(`http://localhost:5000/artifacts/${id}/like`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to like the artifact');
      }

      // Update artifact state to reflect like action
      setArtifact((prev) => ({
        ...prev,
        liked: true,
      }));
    } catch (err) {
      console.error('Error liking artifact:', err);
      setError('Failed to like the artifact');
    } finally {
      setIsLiking(false);
    }
  };

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!artifact) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <header>
        <Navbar />
      </header>

      {/* ✅ Artifact Details Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8 max-w-4xl mx-auto">
          {/* ✅ Artifact Image */}
          <img
            src={artifact.artifactImage || default_Img}
            alt={artifact.artifactName || 'Artifact Image'}
            className="w-full h-64 object-cover rounded-md mb-6"
          />

          {/* ✅ Artifact Information */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {artifact.artifactName}
          </h1>
          <p className="text-gray-600 mb-4">
            {artifact.historicalContext || 'No historical context available.'}
          </p>
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{artifact.discoveredAt || 'Unknown Date'}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{artifact.origin || 'Unknown Origin'}</span>
            </div>
          </div>

          {/* ✅ Like Button */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={handleLike}
              className={`flex items-center px-4 py-2 rounded-md text-white ${
                isLiking || artifact.liked ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
              }`}
              disabled={isLiking || artifact.liked}
            >
              <FaHeart className="mr-2" /> 
              {artifact.liked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer>
        <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
      </footer>
    </div>
  );
};

export default ArtifactDetails;
