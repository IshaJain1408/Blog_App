import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogForm from './components/BlogForm';
import Register from './pages/RegisterPage';

import Login from './pages/LoginPage';
import Profile from './pages/Profile';
import BlogDetails from './pages/BlogDetails';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails/>} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/create-post" element={<BlogForm />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
);

export default App;
