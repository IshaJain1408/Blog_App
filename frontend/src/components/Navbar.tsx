import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../Assests/logo3.png";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import useFetchPosts from '../hooks/useFetchPosts'; 

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { posts, loading, error } = useFetchPosts();

  const categories = Array.from(new Set(posts.map(post => post.category)));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('userEmail'));
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/search', { query: searchQuery });
      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light blog-nav">
      <div className="container-fluid Logo">
        <Link to="/" className="navbar-brand">
          <img src={logo} width={180} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-4">
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="banner-button">Home</button>
              </Link>
            </li>
            <li className="nav-item drop-button">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="categoriesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                {loading ? (
                  <li className="dropdown-item">Loading...</li>
                ) : error ? (
                  <li className="dropdown-item">Error loading categories</li>
                ) : categories.length > 0 ? (
                  categories.map(category => (
                    <li key={category}>
                        {category}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item">No categories found</li>
                )}
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/create-post" style={{ textDecoration: "none" }}>
                <button className="banner-button">Create Post</button>
              </Link>
            </li>
            <li className="nav-item search-bar">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <FaSearch className="search-icon" onClick={handleSearch} />
              </div>
            </li>

            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link1 dropdown-toggle"
                  to="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={30} /> 
                </Link>
                <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button className="banner-button">Login</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
