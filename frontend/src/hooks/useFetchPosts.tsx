import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
    _id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  }
  
interface UseFetchPostsResponse {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const useFetchPosts = (): UseFetchPostsResponse => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data.posts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useFetchPosts;
