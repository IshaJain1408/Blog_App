import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const BlogForm: React.FC = () => {
  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [blogCategory, setBlogCategory] = useState('Technology');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


 const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    previewSelectedImage(file);
  };

  const previewSelectedImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setPreviewImageUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };



  const handleSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('description', blogDescription);
    formData.append('category', blogCategory);
    if (selectedImage) formData.append('image', selectedImage);

    try {
      await axios.post('http://localhost:5000/api/posts', formData);
      alert('Post added successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to add post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="blog-container">
    <Navbar/>
  <div className="blog-form">
    <div className="blog-content">
      <h2 className="blog-text">
      Add a New Blog Post 
      </h2>
    <form onSubmit={handleSubmitPost} className="needs-validation">
        <div className="mb-3 blog-label">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 blog-label">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3 blog-label" >
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            id="category"
            className="form-select"
            value={blogCategory}
            onChange={(e) => setBlogCategory(e.target.value)}
            required
          >
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <div className="mb-3 blog-label">
          <label htmlFor="image" className="form-label">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImageSelection }
            required
          />
        </div>
        {previewImageUrl && (
          <div className="mb-3 text-center">
            <img src={previewImageUrl} alt="Preview" className="img-fluid" style={{ maxWidth: '100px' }} />
          </div>
        )}
        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="banner-button" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Post'}
          </button>
        </div>
      </form>

    
    </div>
  </div>


</div>
    
  );
};

export default BlogForm;

