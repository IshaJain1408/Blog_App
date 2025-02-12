import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import image1 from "../Assests/image1.png";
import "../App.css";
import BlogList from "../components/BlogList";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <div>
        <Navbar />
        <div
        className="home-banner"
          style={{
            backgroundImage: `url(${image1})`,
           
          }}
        >
        <div className="gradient-overlay"></div>
          <div
          className="home-content"
     
          >
            <h2 className="slide-title">Travel</h2>
            <p className="slide-description" >
              Explore new places and share your journey.
            </p>
<Link to={"/create-post"}>
            <motion.button
              className="styled-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your Blog <ArrowRight size={20} />
            </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <BlogList />
    </>
  );
};

export default Home;
