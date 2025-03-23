
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Search, FileEdit, Home, BarChart2 } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bottom-nav">
      <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <User size={24} />
      </Link>
      <Link to="/browse" className={`nav-item ${isActive('/browse') ? 'active' : ''}`}>
        <Search size={24} />
      </Link>
      <Link to="/create" className={`nav-item ${isActive('/create') ? 'active' : ''}`}>
        <FileEdit size={24} />
      </Link>
      <Link to="/nutrition" className={`nav-item ${isActive('/nutrition') ? 'active' : ''}`}>
        <BarChart2 size={24} />
      </Link>
    </div>
  );
};

export default BottomNavigation;
