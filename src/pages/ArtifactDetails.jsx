import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useNavigate
import { FaHeart } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';
import { AuthContext } from '../provider/AuthProvider';

const ArtifactDetails = () => {
  const { id } = useParams(); // Extract artifact ID from URL params
  const [artifact, setArtifact] = useState(null); // State to store artifact details
  const [error, setError] = useState(null); // State to store errors
  const [isLiking, setIsLiking] = useState(false); // State for like button loading
  const [liked, setLiked] = useState(false); // Track if the artifact is liked or not
  // const navigate = useNavigate(); // Initialize navigate
  const { user } = useContext(AuthContext); // Get logged-in user data

  // console.log(user.email)
  // Fetch Artifact Details
  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artifact details');
        }
        const data = await response.json();
        setArtifact(data);
        setLiked(data.likes > 0); // Set initial liked state based on fetched data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArtifact();
  }, [id]);

  // Handle Like Button Click
  const handleLike = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    if (!artifact) return;
    setIsLiking(true);

    try {
      const newLikes = liked ? (artifact.likes || 0) - 1 : (artifact.likes || 0) + 1;

      const response = await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: newLikes }),
      });



      if (response.ok) {

        const updatedArtifactResponse = await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}`);
        if (updatedArtifactResponse.ok) {
          const updatedArtifact = await updatedArtifactResponse.json();
          setArtifact(updatedArtifact);
        }

        setArtifact((prevArtifact) => ({
          ...prevArtifact,
          likes: newLikes,
        })); // Toggle the liked state

        setLiked(!liked); // Toggle the liked state
        // Optionally store in localStorage or sessionStorage
        // const likedArtifacts = JSON.parse(localStorage.getItem('likedArtifacts') || '[]');
       
        const LikedData = {
          artifactName: artifact.artifactName,
          artifactImage: artifact.artifactImage,
          artifactType: artifact.artifactType,
          historicalContext: artifact.historicalContext,
          createdAt: artifact.createdAt,
          discoveredAt: artifact.discoveredAt,
          discoveredBy: artifact.discoveredBy,
          presentLocation: artifact.presentLocation,
          adderName: user?.displayName || "Unknown User",
          adderEmail: user?.email || "Unknown Email",
          userEmail: user.email,
          artifactId: artifact._id,
          likes: newLikes,
        };



        if (!liked) {    // Constructing the LikedData object using artifact properties


          console.log("Liked Data:", LikedData); // Log the liked data to check

          // Save liked artifact data to the backend
          await fetch("https://historical-artifacts-tracker-server-blue.vercel.app/add-liked-data", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(LikedData),
          });

        } else {

       await fetch(
        `https://historical-artifacts-tracker-server-blue.vercel.app/remove-liked-data/${artifact._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: user?.email }),
        }
      );
    }
  
 }
      // Reload the page by navigating to the same page
      // navigate(0); // This will refresh the page
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLiking(false);
    }
  };

  // Error State
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  // Loading State
  if (!artifact) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Render Artifact Details
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="mt-16">
        <Navbar />
      </header>
      <div className="container mx-auto text-gray-700 p-6 bg-white shadow-md rounded-lg lg:w-5/12  w-10/12 mb-10 mt-10">
        <h2 className="text-3xl  text-center font-bold mb-4">{artifact.artifactName}</h2>
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

        {/*Like Button */}
        <div className="flex items-center gap-3  mt-4">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`px-4 py-2 rounded-md text-white ${isLiking ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-blue-600'
              }`}
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
        <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
      </footer>
    </div>
  );
};

export default ArtifactDetails;
