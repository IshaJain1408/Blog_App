import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogForm from './components/BlogForm';
import Register from './pages/RegisterPage';

import Login from './pages/LoginPage';
import Profile from './pages/Profile';
import BlogDetails from './pages/BlogDetails';
import SearchResults from './pages/SearchResults';

const App: React.FC = () => (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<BlogForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
);

export default App;
