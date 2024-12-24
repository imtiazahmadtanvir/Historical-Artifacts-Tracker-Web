import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AddArtifact = () => {
  const loggedInUser = {
    name: "John Doe", // Replace with actual user name from auth
    email: "johndoe@example.com", // Replace with actual user email from auth
  };

  const [formData, setFormData] = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
    adderName: loggedInUser.name,
    adderEmail: loggedInUser.email,
    likes: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Image URL validation
    if (!/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/i.test(formData.artifactImage)) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    setIsLoading(true);
    fetch("https://your-api.com/api/artifacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Artifact added successfully!");
          setFormData({
            artifactName: "",
            artifactImage: "",
            artifactType: "",
            historicalContext: "",
            createdAt: "",
            discoveredAt: "",
            discoveredBy: "",
            presentLocation: "",
            adderName: loggedInUser.name,
            adderEmail: loggedInUser.email,
            likes: 0,
          });
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to add artifact.");
          });
        }
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Artifact</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          {/* Artifact Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Name
            </label>
            <input
              type="text"
              name="artifactName"
              value={formData.artifactName}
              onChange={handleChange}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              required
            />
          </div>

          {/* Artifact Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Image (URL)
            </label>
            <input
              type="url"
              name="artifactImage"
              value={formData.artifactImage}
              onChange={handleChange}
              className="mt-1 block px-3 w-full rounded-md border-gray-300"
              required
            />
          </div>

          {/* Artifact Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Type
            </label>
            <select
              name="artifactType"
              value={formData.artifactType}
              onChange={handleChange}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Historical Context
            </label>
            <textarea
              name="historicalContext"
              value={formData.historicalContext}
              onChange={handleChange}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Created and Discovered At */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                className="mt-1 block px-3 w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discovered At
              </label>
              <input
                type="text"
                name="discoveredAt"
                value={formData.discoveredAt}
                onChange={handleChange}
                className="mt-1 px-3 block w-full rounded-md border-gray-300"
                required
              />
            </div>
          </div>

          {/* Discovered By & Present Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discovered By
            </label>
            <input
              type="text"
              name="discoveredBy"
              value={formData.discoveredBy}
              onChange={handleChange}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Present Location
            </label>
            <input
              type="text"
              name="presentLocation"
              value={formData.presentLocation}
              onChange={handleChange}
              className="mt-1 px-3 block w-full rounded-md border-gray-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white font-semibold py-2 rounded-md ${
              isLoading ? "bg-gray-400" : " bg-yellow-400 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding Artifact..." : "Add Artifact"}
          </button>
        </form>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AddArtifact;
