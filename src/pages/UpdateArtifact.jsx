import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateArtifact = () => {
    const { id } = useParams(); // Get artifact ID from URL
    const navigate = useNavigate();
    const [artifact, setArtifact] = useState({
        artifactName: '',
        artifactImage: '',
        artifactType: '',
        historicalContext: '',
        createdAt: '',
        discoveredAt: '',
        discoveredBy: '',
        presentLocation: '',
    });

    useEffect(() => {
        // Fetch artifact data by ID
        const fetchArtifact = async () => {
            try {
                const response = await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch artifact');
                }
                const data = await response.json();
                setArtifact(data);
            } catch (error) {
                console.error('Error fetching artifact:', error);
            }
        };

        fetchArtifact();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtifact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id, ...updatedArtifact } = artifact;  
    
            const response = await fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/artifacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedArtifact),  // Send the data without _id
            });
    
            if (!response.ok) {
                throw new Error('Failed to update artifact');
            }
    
            Swal.fire('Success!', 'Artifact updated successfully', 'success');
            navigate('/my-artifacts');
        } catch (error) {
            console.error('Error updating artifact:', error);
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
        }
    };
    
    return (
        <div className=" bg-white ">
            <nav>
                <Navbar></Navbar>
                <h2 className="text-3xl py-4 text-gray-700 text-center font-bold">Update Artifact</h2>
            </nav>

            <main className="flex w-10/12  shadow-lg bg-gray-900 rounded-lg mb-6  lg:w-6/12 flex-grow container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-4 form-content w-full">
                    <label htmlFor="artifactName" className="block text-sm font-medium text-gray-400">
                        Artifact Name
                    </label>
                    <input name="artifactName" value={artifact.artifactName} onChange={handleChange} placeholder="Artifact Name" className="input w-full" />

                    <label htmlFor="artifactImage" className="block text-sm font-medium text-gray-400">
                        Artifact Image URL
                    </label>
                    <input name="artifactImage" value={artifact.artifactImage} onChange={handleChange} placeholder="Artifact Image URL" className="input w-full" />
                    <label htmlFor="artifactType" className="block text-sm font-medium text-gray-400">
                        Artifact Type
                    </label>
                    <select name="artifactType" value={artifact.artifactType} onChange={handleChange} className="input w-full">
                        <option value="">Select Type</option>
                        <option value="Tools">Tools</option>
                        <option value="Weapons">Weapons</option>
                        <option value="Documents">Documents</option>
                        <option value="Writings">Writings</option>
                    </select>
                    <label htmlFor="historicalContext" className="block text-sm font-medium text-gray-400">
                        Historical Context
                    </label>
                    <input name="historicalContext" value={artifact.historicalContext} onChange={handleChange} placeholder="Historical Context" className="input w-full" />
                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-400">
                        Created At (e.g., 100 BC)
                    </label>
                    <input name="createdAt" value={artifact.createdAt} onChange={handleChange} placeholder="Created At (e.g., 100 BC)" className="input w-full" />
                    <label htmlFor="discoveredAt" className="block text-sm font-medium text-gray-400">
                        Discovered At (e.g., 1799)
                    </label>
                    <input name="discoveredAt" value={artifact.discoveredAt} onChange={handleChange} placeholder="Discovered At (e.g., 1799)" className="input w-full" />
                    <label htmlFor="discoveredBy" className="block text-sm font-medium text-gray-400">
                        Discovered By
                    </label>
                    <input name="discoveredBy" value={artifact.discoveredBy} onChange={handleChange} placeholder="Discovered By" className="input w-full" />
                    <label htmlFor="presentLocation" className="block text-sm font-medium text-gray-400">
                        Present Location
                    </label>
                    <input name="presentLocation" value={artifact.presentLocation} onChange={handleChange} placeholder="Present Location" className="input w-full" />

                    <button type="submit" className="btn btn-primary w-full">Update Artifact</button>
                </form>
            </main>
            <footer>
                <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
            </footer>
        </div>
    );
};

export default UpdateArtifact;
