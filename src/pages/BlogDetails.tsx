import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchPosts from '../hooks/useFetchPosts';
import Navbar from '../components/Navbar';

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string  }>();
  const { posts, loading, error } = useFetchPosts();
  const [postDetails, setPostDetails] = useState<any>(null);

  useEffect(() => {
    if (id) {
      console.log('Post ID from URL:', id); 

      const post = posts.find((post) => post._id.toString() === id); 
      console.log('Post found:', post);
      setPostDetails(post);
    }
  }, [id, posts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
            <Navbar/>

    <div className="container" style={{marginTop:"5.5rem"}}>
      <section className="blog-details">
        <div className="container">
          {postDetails ? (
            <div>
              <h2>{postDetails.title}</h2>
              <img
                src={`http://localhost:5000/storage/${postDetails.image}`}
                alt={postDetails.title}
                className="img-fluid"
              />
              <p>{postDetails.description}</p>
            </div>
          ) : (
            <p>Post not found</p>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default BlogDetails;
