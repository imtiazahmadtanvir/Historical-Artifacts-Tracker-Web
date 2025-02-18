import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';
import { AuthContext } from '../provider/AuthProvider';

const ArtifactDetails = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [error, setError] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artifact details');
        }
        const data = await response.json();
        setArtifact(data);
        setLiked(data.likes > 0);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchArtifact();
  }, [id]);

  const handleLike = async (event) => {
    event.preventDefault();
    if (!artifact) return;
    setIsLiking(true);
    try {
      const newLikes = liked ? (artifact.likes || 0) - 1 : (artifact.likes || 0) + 1;
      await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}/likes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: newLikes }),
      });
      setArtifact((prevArtifact) => ({ ...prevArtifact, likes: newLikes }));
      setLiked(!liked);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLiking(false);
    }
  };

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!artifact) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="mt-16">
        <Navbar />
      </header>
      <div className="container mx-auto text-gray-700 dark:text-gray-300 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg lg:w-5/12 w-10/12 mb-10 mt-10">
        <h2 className="text-3xl text-center font-bold mb-4">{artifact.artifactName}</h2>
        <img
          src={artifact.artifactImage || default_Img}
          alt={artifact.artifactName}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p><strong>Type: </strong> {artifact.artifactType}</p>
        <p><strong>Historical Context: </strong> {artifact.historicalContext}</p>
        <p><strong>Created At: </strong> {artifact.createdAt}</p>
        <p><strong>Discovered At: </strong> {artifact.discoveredAt}</p>
        <p><strong>Discovered By: </strong> {artifact.discoveredBy}</p>
        <p><strong>Present Location: </strong> {artifact.presentLocation}</p>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`px-4 py-2 rounded-md text-white ${isLiking ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLiking ? 'Liking...' : (
              <div className="flex items-center gap-2">
                <FaHeart className={`text-${liked ? 'red' : 'white'}-500`} />
                {liked ? 'Dislike' : 'Like'}
              </div>
            )}
          </button>
          <span className="text-lg font-medium">Likes: {artifact.likes || 0}</span>
        </div>
      </div>
      <footer className='mt-8'>
        <Footer className="bottom-0 left-0 w-full z-50 bg-base-200 dark:bg-gray-800" />
      </footer>
    </div>
  );
};

export default ArtifactDetails;
