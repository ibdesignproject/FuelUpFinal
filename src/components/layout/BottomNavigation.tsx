
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BarChart2, User, PlusSquare } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/options" className={`nav-item ${isActive('/options') ? 'active' : ''}`}>
        <Search size={24} />
        <span className="text-xs mt-1">Options</span>
      </Link>
      <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      <Link to="/meal-generator" className={`nav-item ${isActive('/meal-generator') ? 'active' : ''}`}>
        <PlusSquare size={24} />
        <span className="text-xs mt-1">Meals</span>
      </Link>
      <Link to="/nutrition" className={`nav-item ${isActive('/nutrition') ? 'active' : ''}`}>
        <BarChart2 size={24} />
        <span className="text-xs mt-1">Nutrition</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
