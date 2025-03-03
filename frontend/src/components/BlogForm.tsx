// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from './Navbar';

// const BlogForm: React.FC = () => {
//   const [title, setTitle] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [image, setImage] = useState<File | null>(null); 
//   const [image1, setImage1] = useState<string>(''); 

//   const [category, setCategory] = useState<string>('Technology');
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setImage(file); 

//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         if (e.target?.result && typeof e.target.result === 'string') {
//           // console.log(e.target.result)
//           setImage1(e.target.result); 
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', category);

    
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/posts', formData);
//       console.log('Post added successfully:', response.data);


//       setTitle('');
//       setDescription('');
//       setImage(null);
//       setCategory('Technology');
//       alert('Post added successfully!');
//       navigate('/');

//     } catch (error) {
//       console.error( error);
//       alert('Failed to add post. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (


//     <div className="login-container">
//       <Navbar/>
//     <div className="login-form1">
//       <div className="login-content1">
//         <h2 className="welcome-text1">
//         Add a New Blog Post 
//         </h2>
       
//         <form onSubmit={handleSubmit} className="needs-validation">
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">Title:</label>
//             <input
//               type="text"
//               id="title"
//               className="form-control"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">Description:</label>
//             <textarea
//               id="description"
//               className="form-control"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="category" className="form-label">Category:</label>
//             <select
//               id="category"
//               className="form-select"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="Technology">Technology</option>
//               <option value="Health">Health</option>
//               <option value="Lifestyle">Lifestyle</option>
//               <option value="Business">Business</option>
//               <option value="Education">Education</option>
//               <option value="Travel">Travel</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="image" className="form-label">Upload Image:</label>
//             <input
//               type="file"
//               id="image"
//               name="image"
//               className="form-control"
//               onChange={handleImageUpload }
//               required
//             />
//           </div>
//           {image1 && (
//             <div className="mb-3 text-center">
//               <img src={image1} alt="Preview" className="img-fluid" style={{ maxWidth: '100px' }} />
//             </div>
//           )}
//           <div className="d-flex justify-content-center mt-4">
//             <button type="submit" className="banner-button" disabled={loading}>
//               {loading ? 'Adding...' : 'Add Post'}
//             </button>
//           </div>
//         </form>

      
//       </div>
//     </div>

 
//   </div>
    
  
//   );
// };

// export default BlogForm;


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

