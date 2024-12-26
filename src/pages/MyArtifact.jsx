import { useState, useEffect, useContext } from 'react';
import { FaHeart, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';
import { AuthContext } from '../provider/AuthProvider';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const MyArtifact = () => {
  const [artifacts, setArtifacts] = useState([]); // To store fetched artifacts
  const { user } = useContext(AuthContext); // Get logged-in user data
  const navigate = useNavigate(); // Initialize navigate
  const [loading, setLoading] = useState(false); // Loading state to show progress

  // console.log('Logged in user email:', user?.email);

  useEffect(() => {
    if (user) {
      const fetchArtifacts = async () => {
        try {
          const response = await fetch('http://localhost:5000/artifacts');
          if (!response.ok) {
            throw new Error('Failed to fetch artifacts');
          }
          const data = await response.json();
          const userArtifacts = data.filter((artifact) => {
            return artifact.adderEmail?.toLowerCase() === user.email?.toLowerCase();
          });
          setArtifacts(userArtifacts);
        } catch (error) {
          console.error('Error fetching artifacts:', error);
        }
      };

      fetchArtifacts();
    }
  }, [user]);

  const HandleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); // Show loading indicator
        fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${_id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setArtifacts((prevArtifacts) => prevArtifacts.filter((artifact) => artifact._id !== _id));
              Swal.fire('Deleted!', 'Your artifact has been deleted.', 'success');
              navigate(0); // Use navigate(0) to reload the page
            }
            setLoading(false); // Hide loading indicator after operation
          })
          .catch((error) => {
            console.error('Error deleting artifact:', error);
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            setLoading(false); // Hide loading indicator on error
          });
      }
    });
  };

  if (!user) {
    return <div className="text-center py-10 text-red-500">Please log in to view your artifacts.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
      </header>

      <section className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">My Artifacts</h2>

          {artifacts.length === 0 ? (
            <p className="text-gray-600">No artifacts available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-4">
              {artifacts.map((artifact) => (
                <div
                  key={artifact._id}
                  className="bg-white w-10/12 mx-auto shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={artifact.artifactImage || default_Img}
                    alt={artifact.artifactName || 'Artifact Image'}
                    className="w-full h-40 object-cover"
                    onError={(e) => (e.target.src = default_Img)}
                  />
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {artifact.artifactName}
                    </h3>
                    <p className="text-gray-600 w-10/12 mx-auto text-sm mt-2 mb-4 truncate">
                      {artifact.historicalContext || 'No description available.'}
                    </p>
                    <p className="text-left text-gray-600 text-sm mb-2">
                      <strong>Category:</strong> {artifact.category || 'Unknown'}
                    </p>
                    <p className="text-left text-gray-600 text-sm mb-2">
                      <strong>Location of Discovery:</strong> {artifact.location || 'Not Available'}
                    </p>
                    <p className="text-left text-gray-600 text-sm mb-2">
                      <strong>Discovered By:</strong> {artifact.discoveredBy || 'Unknown'}
                    </p>
                    <p className="text-left text-gray-600 text-sm mb-4">
                      <strong>Date Added:</strong> {new Date(artifact.dateAdded).toLocaleDateString() || 'Unknown'}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FaHeart />
                        <span>{artifact.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt />
                        <span>{artifact.discoveredAt || 'Unknown'}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => navigate(`/update-artifact/${artifact._id}`)}
                        className="btn btn-primary flex-grow"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => HandleDelete(artifact._id)}
                        className="btn btn-error flex-grow"
                        disabled={loading} // Disable button while loading
                      >
                        {loading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer>
        <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
      </footer>
    </div>
  );
};

export default MyArtifact;
