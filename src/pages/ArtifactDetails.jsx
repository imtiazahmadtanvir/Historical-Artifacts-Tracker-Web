import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const ArtifactDetails = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);

  useEffect(() => {
    const fetchArtifact = async () => {
      const response = await fetch(`http://localhost:5000/artifacts/${id}`);
      const data = await response.json();
      setArtifact(data);
    };

    fetchArtifact();
  }, [id]);

  const handleLike = async () => {
    await fetch(`http://localhost:5000/artifacts/${id}/like`, { method: 'PATCH' });
    setArtifact((prev) => ({ ...prev, likes: prev.likes + 1 }));
  };

  if (!artifact) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{artifact.name}</h1>
      <p>{artifact.description}</p>
      <img src={artifact.image} alt={artifact.name} className="w-full h-64 object-cover my-4" />
      <button onClick={handleLike} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
        <FaHeart className="mr-2" /> Like ({artifact.likes})
      </button>
    </div>
  );
};

export default ArtifactDetails;
