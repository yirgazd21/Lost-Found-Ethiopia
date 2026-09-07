import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, User, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Search', path: '/search', icon: <Search size={18} /> },
    { name: 'Report Lost', path: '/report-lost', icon: <MapPin size={18} /> },
    { name: 'Report Found', path: '/report-found', icon: <MapPin size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      {/* 
        We use the 'glass-panel' utility class defined in index.css 
        to give the navbar a beautiful frosted-glass look. 
      */}
      <nav className="glass-panel mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-600 text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Search size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            Lost & Found
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-slate-600 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 hover:text-brand-600 transition-colors ${
                  isActive(link.path) ? 'text-brand-600' : ''
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="flex items-center gap-2 text-slate-600 hover:text-brand-600 font-medium transition-colors">
              <LogIn size={18} />
              Login
            </Link>
            <Link to="/register" className="btn-primary flex items-center gap-2 py-2 px-5">
              <User size={18} />
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-600 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[85px] left-4 right-4 glass-panel p-4 flex flex-col gap-4 animate-slide-up">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700"
            >
              <div className="text-brand-500">{link.icon}</div>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <div className="h-px w-full bg-slate-100 my-2"></div>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-secondary text-center">
            Login
          </Link>
          <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
