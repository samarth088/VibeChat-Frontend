import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">💬</span>
          VibeChat
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/profile" className="hover:text-blue-200 transition">Profile</Link>
            <button 
              onClick={logout}
              className="bg-white text-blue-600 px-4 py-1 rounded-full font-medium hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-3">
            <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded-full font-medium hover:bg-blue-50 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
