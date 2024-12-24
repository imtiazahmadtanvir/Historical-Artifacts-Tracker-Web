import { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import {FaHeart, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';
import { AuthContext } from '../provider/AuthProvider';

const MyArtifact = () => {
  const [artifacts, setArtifacts] = useState([]); // To store fetched artifacts
  const { user } = useContext(AuthContext); // Get logged-in user data

  console.log('Logged in user email:', user?.email);

  useEffect(() => {
    if (user) {
      // Fetch artifacts data when user is logged in
      const fetchArtifacts = async () => {
        try {
          const response = await fetch('http://localhost:5000/artifacts');
          if (!response.ok) {
            throw new Error('Failed to fetch artifacts');
          }
          const data = await response.json();
          console.log('Fetched artifacts:', data); // Log the fetched data for debugging

          // Filter artifacts based on the logged-in user's email
          const userArtifacts = data.filter((artifact) => {
            // Check if the artifact has the adderEmail field and it matches user.email
            if (artifact.adderEmail) {
              console.log('Comparing', artifact.adderEmail, 'with', user.email); // Log comparison
              return artifact.adderEmail.toLowerCase() === user.email.toLowerCase();
            }
            return false;
          });

          console.log('Filtered artifacts:', userArtifacts); // Log the filtered artifacts
          setArtifacts(userArtifacts);
        } catch (error) {
          console.error('Error fetching artifacts:', error);
        }
      };

      fetchArtifacts();
    }
  }, [user]); // This will run when the user state changes

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

                    {/* Add More Information Here */}
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


                    <div className="flex justify-between mt-4">
                      <button className="text-sm text-yellow-500 hover:text-yellow-600">Update</button>
                      <button className="text-sm text-red-500 hover:text-red-600">Delete</button>
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
