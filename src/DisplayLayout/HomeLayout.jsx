import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FeaturedArtifacts from "../components/FeaturedArtifacts";
import WhyPreservingHistory from "../components/WhyPreservingHistory";
import YourRoleInPreservingHistory from "../components/YourRoleInPreservingHistory";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
        <Banner></Banner>
      </header>
      <FeaturedArtifacts></FeaturedArtifacts>
       <WhyPreservingHistory></WhyPreservingHistory>
       <YourRoleInPreservingHistory></YourRoleInPreservingHistory>
      <main className="flex-grow bg-white">
        <Outlet />
      </main>

      <footer className="bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
