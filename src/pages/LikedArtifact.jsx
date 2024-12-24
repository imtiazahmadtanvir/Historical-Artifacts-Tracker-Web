import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const LikedArtifact = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <header><Navbar></Navbar></header>
            <main className="flex-grow"></main>
            <footer>
            <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" />
            </footer>
        </div>
    );
};

export default LikedArtifact;