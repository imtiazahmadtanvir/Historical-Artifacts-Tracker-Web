import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import default_Img from '../assets/bg4.jpg';

// const artifacts = [
//   {
//     _id: "1",
//     name: "Rosetta Stone",
//     shortDescription: "Ancient Egyptian artifact helping decode hieroglyphs.",
//     image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Rosetta_Stone.JPG",
//     likes: 1024,
//     dateDiscovered: "1799",
//     location: "Egypt",
//   },
//   {
//     _id: "2",
//     name: "Antikythera Mechanism",
//     shortDescription: "An ancient Greek analog computer used for astronomy.",
//     image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Antikythera_mechanism.jpg",
//     likes: 874,
//     dateDiscovered: "1901",
//     location: "Greece",
//   },
//   {
//     _id: "3",
//     name: "Terracotta Army",
//     shortDescription: "Collection of terracotta sculptures depicting warriors.",
//     image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Terracotta_Army.jpg",
//     likes: 765,
//     dateDiscovered: "1974",
//     location: "China",
//   },
//   {
//     _id: "4",
//     name: "Dead Sea Scrolls",
//     shortDescription: "Ancient Jewish manuscripts discovered in the Qumran Caves.",
//     image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Dead_Sea_Scrolls.jpg",
//     likes: 652,
//     dateDiscovered: "1947",
//     location: "Palestine",
//   },
//   {
//     _id: "5",
//     name: "King Tutankhamun's Mask",
//     shortDescription: "Golden funerary mask of the young pharaoh Tutankhamun.",
//     image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Tutankhamun%27s_mask.jpg",
//     likes: 589,
//     dateDiscovered: "1922",
//     location: "Egypt",
//   },
//   {
//     _id: "6",
//     name: "Shroud of Turin",
//     shortDescription: "A linen cloth believed to bear the image of Jesus.",
//     image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Shroud_of_Turin.jpg",
//     likes: 521,
//     dateDiscovered: "1354",
//     location: "Italy",
//   },
// ];



const AllArtifactsPage = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/artifacts');
        const data = await response.json();
        setArtifacts(data);
      } catch (error) {
        console.error('Error fetching artifacts:', error);
      }
    };

    fetchArtifacts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
      </header>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">All Artifacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={artifact.image || default_Img}
                  alt={artifact.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{artifact.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 mb-4 truncate">{artifact.shortDescription}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FaHeart className="text-red-600" />
                      <span>{artifact.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt />
                      <span>{artifact.dateDiscovered}</span>
                    </div>
                  </div>
                  <Link
                    to={`/artifact/${artifact._id}`}
                    className="flex items-center mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
      </footer>
    </div>
  );
};

export default AllArtifactsPage;
