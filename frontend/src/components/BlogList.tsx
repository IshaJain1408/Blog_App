import React, { useEffect, useState } from 'react';
import useFetchPosts from '../hooks/useFetchPosts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaTrash  } from 'react-icons/fa';

const BlogList: React.FC = () => {
  const { posts, loading, error ,fetchPosts} = useFetchPosts();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const navigateToPost = (postId: number) => navigate(`/blog/${postId}`);

  const handleDelete = async (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postId}`);
        fetchPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
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
                    <div className="button-row">

                    <button className="blog-button" onClick={() => navigateToPost(post._id)}>
Read More
</button>
{userEmail && (
                          <div className="button-end">
                            <button className="delete-button" onClick={() => handleDelete(post._id)}>
                              <FaTrash className="delete-icon" />
                            </button>
                          </div>
                        )}
                      </div>
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
