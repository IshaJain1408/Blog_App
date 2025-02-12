import React from 'react';
import useFetchPosts from '../hooks/useFetchPosts'; 
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const BlogList: React.FC = () => {
  const { posts, loading, error } = useFetchPosts(); 
  // console.log(posts)
  const navigate = useNavigate(); 

const handleReadMore = (postId: number) => {
  navigate(`/blog/${postId}`)
};


  return (
    
    <div className="container mt-5">
      <section className="blog-section">
        <div className="container">
          <h2 className="text-center mb-4 banner-title">Latest Blog Posts</h2>

          {loading && <p className="text-center">Loading...</p>} 
          
          {error && <p className="text-center text-danger">{error}</p>} 
          
          <div className="row">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={post._id}>
                  <div className="card shadow-sm blog-card animate-card">
                    {/* <div className="image-container">
                      <img
                        src={`http://localhost:5000/storage/${post.image}`}
                        alt={post.title}
                        className="card-img-top blog-card-img"
                      />
                      <div className="image-label">
                        <span>{post.category}</span>
                      </div>
                    </div> */}

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
                      {/* <Link to={`/blog/${post._id}` ,replace: true}  style={{textDecoration:"none"}}>
                      <button className="blog-button">   Read More
                      </button>
                      </Link> */}
                      <button className="blog-button" onClick={() => handleReadMore(post._id)}>
  Read More
</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No blog posts available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;

