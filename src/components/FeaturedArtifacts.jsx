import { Link } from "react-router-dom";
import { FaHeart, FaArrowRight } from "react-icons/fa"; // Icons from React Icons
import default_Img from "../assets/bg4.jpg"; // Fallback image

const artifacts = [
  {
    _id: "1",
    name: "Rosetta Stone",
    shortDescription: "Ancient Egyptian artifact helping decode hieroglyphs.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Rosetta_Stone.JPG",
    likes: 1024,
  },
  {
    _id: "2",
    name: "Antikythera Mechanism",
    shortDescription: "An ancient Greek analog computer used for astronomy.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Antikythera_mechanism.jpg",
    likes: 874,
  },
  {
    _id: "3",
    name: "Terracotta Army",
    shortDescription: "Collection of terracotta sculptures depicting warriors.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Terracotta_Army.jpg",
    likes: 765,
  },
  {
    _id: "4",
    name: "Dead Sea Scrolls",
    shortDescription: "Ancient Jewish manuscripts discovered in the Qumran Caves.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Dead_Sea_Scrolls.jpg",
    likes: 652,
  },
  {
    _id: "5",
    name: "King Tutankhamun's Mask",
    shortDescription: "Golden funerary mask of the young pharaoh Tutankhamun.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Tutankhamun%27s_mask.jpg",
    likes: 589,
  },
  {
    _id: "6",
    name: "Shroud of Turin",
    shortDescription: "A linen cloth believed to bear the image of Jesus.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Shroud_of_Turin.jpg",
    likes: 521,
  },
];

const FeaturedArtifacts = () => {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Featured Artifacts
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {artifacts.map((artifact) => (
          <div
            key={artifact._id}
            className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2"
          >
            {/* using default image for initaily */}
            <img
              src={default_Img || default_Img}
              alt={artifact.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {artifact.name}
              </h3>
              <p className="text-gray-700 text-sm mt-2 truncate">
                {artifact.shortDescription}
              </p>
              <div className="flex items-center justify-between mt-3 text-gray-700">
                <div className="flex items-center gap-1">
                  <FaHeart className="text-red-500" />
                  <span className="font-bold">{artifact.likes}</span>
                </div>
                <Link
                  to={`/artifact/${artifact._id}`}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  View Details <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/all-artifacts"
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
        >
          See All Artifacts <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArtifacts;
