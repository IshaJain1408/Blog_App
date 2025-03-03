import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import Navbar from '../components/Navbar';

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, loading, error } = useFetchPosts();
  const [postDetails, setPostDetails] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const post = posts.find((post) => post._id.toString() === id);
      setPostDetails(post);
    }
  }, [id, posts]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container blog-details-container">
        <section className="blog-details">
          <div className="blog-content-box">
            {postDetails ? (
              <div>
                <h2 className="blog-title">{postDetails.title}</h2>
                <img
                  src={`http://localhost:5000/storage/${postDetails.image}`}
                  alt={postDetails.title}
                  className="blog-image"
                />
                <p className="blog-description">{postDetails.description}</p>
              </div>
            ) : (
              <p className="text-center text-muted">Post not found</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogDetails;
