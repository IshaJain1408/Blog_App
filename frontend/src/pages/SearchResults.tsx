import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";


const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleReadMore = (postId:
    any
  ) => {
    navigate(`/blog/${postId}`, { replace: true });
  };
  const results = location.state?.results || [];

  return (
    <>
          <Navbar/>

    <div className="container" style={{marginTop:"5.5rem"}}>
      <h2 style={{color:"white",padding:"20px"}}>Search Results</h2>
      <hr style={{color:"white",paddingBottom:"10px"}} />

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="row">
          {results.map((post: any) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={post._id}>
              <div className="card shadow-sm blog-card animate-card">
           

             <div className="image-container">
                  <motion.img
                    src={`http://localhost:5000/storage/${post.image}`}
                    alt={post.title}
                    className="card-img-top blog-card-img"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="image-label">
                    <span>{post.category}</span>
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                
                  <button className="blog-button" onClick={() => handleReadMore(post._id)}>
Read More
</button>
                </div>
              </div>
            </div>
            
          
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default SearchResults;
