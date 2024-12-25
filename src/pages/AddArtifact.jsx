import { useState, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2"; // Don't forget to import SweetAlert2

const AddArtifact = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext

  // State to check if user data is loaded
  const [isUserLoaded, setIsUserLoaded] = useState(false);  // Correctly destructure

  // Update isUserLoaded when user data changes
  useEffect(() => {
    if (user) {
      setIsUserLoaded(true);  // This will work now
    }
  }, [user]);

  const formData = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
    adderName: user?.displayName || "Unknown User",  // Use user's name from context or fallback to "Unknown User"
    adderEmail: user?.email || "Unknown Email",  // Use user's email from context or fallback to "Unknown Email"
    likes: 0,
  });

  
  const [isLoading] = useState(false); // Loading state


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
  
    // Extract form values
    const artifactName = form.artifactName.value;
    const artifactImage = form.artifactImage.value;
    const artifactType = form.artifactType.value;
    const historicalContext = form.historicalContext.value;
    const createdAt = form.createdAt.value;
    const discoveredAt = form.discoveredAt.value;
    const discoveredBy = form.discoveredBy.value;
    const presentLocation = form.presentLocation.value;
  
    const artifactData = {
      artifactName,
      artifactImage,
      artifactType,
      historicalContext,
      createdAt,
      discoveredAt,
      discoveredBy,
      presentLocation,
      adderName: user?.displayName || "Unknown User",
      adderEmail: user?.email || "Unknown Email",
      likes: 0,
    };
  
    console.log("Artifact Data:", artifactData);
  
    // Send data to the backend
    fetch('http://localhost:5000/add-artifacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artifactData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Artifact "${artifactData.artifactName}" added successfully!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add artifact. Please try again.",
        });
      });
  
    // Reset the form after submission
    form.reset();
  };
  
  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading user data...</p>
      </div>
    );
  }

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Add Artifact</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md lg:w-8/12 mx-auto space-y-4"
        >
          {/* Artifact Name */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Artifact Name
            </label>
            <input
              type="text"
              name="artifactName"
              value={formData.artifactName}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              required
            />
          </div>

          {/* Artifact Image */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Artifact Image (URL)
            </label>
            <input
              type="url"
              name="artifactImage"
              value={formData.artifactImage}
              className="mt-1 block px-3 w-full rounded-md border-gray-300"
              required
            />
          </div>

          {/* Artifact Type */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Artifact Type
            </label>
            <select
              name="artifactType"
              value={formData.artifactType}
              className="mt-1 block px-3 w-full rounded-md border-gray-300"
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Tools">Tools</option>
              <option value="Weapons">Weapons</option>
              <option value="Documents">Documents</option>
              <option value="Writings">Writings</option>
            </select>
          </div>

          {/* Historical Context */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Historical Context
            </label>
            <textarea
              name="historicalContext"
              value={formData.historicalContext}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Created and Discovered At */}
          <div className="form-control">
              <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <input
                id="createdAt"
                type="text"
                name="createdAt"
                value={formData.createdAt}
                className="mt-1 block px-3 w-full rounded-md border-gray-300"
              />
            </div>
            <div className="form-control">
              <label htmlFor="discoveredAt" className="block text-sm font-medium text-gray-700">
                Discovered At
              </label>
              <input
                id="discoveredAt"
                type="date"
                name="discoveredAt"
                value={formData.discoveredAt}
                className="mt-1 block px-3 w-full rounded-md border-gray-300"
              />
            </div>

          {/* Discovered By & Present Location */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Discovered By
            </label>
            <input
              type="text"
              name="discoveredBy"
              value={formData.discoveredBy}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              required
            />
          </div>

          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Present Location
            </label>
            <input
              type="text"
              name="presentLocation"
              value={formData.presentLocation}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              required
            />
          </div>

          {/* Adder Name & Email (Read-Only) */}
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Adder Name
            </label>
            <input
              type="text"
              name="adderName"
              value={user.displayName}  // Corrected to use adderName
              readOnly
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
            />
          </div>

          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700">
              Adder Email
            </label>
            <input
              type="email"
              name="adderEmail"
              value={user.email}  // Corrected to use adderEmail
              readOnly
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control">
          <button
            type="submit"
            className={`w-full font-bold  py-2 text-gray-800 rounded-md ${isLoading ? "bg-yellow-400" : " bg-yellow-400  hover:bg-blue-700"
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding Artifact..." : "Add Artifact"}
          </button>
          </div>
          
        </form>
      </main>
      <footer>
            <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
      </footer>
    </div>
  );
};

export default AddArtifact;
