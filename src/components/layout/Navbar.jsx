// Navbar.jsx
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

const Navbar = ({ auth, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = auth;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-26">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-secondary">
            <img src={logo} alt="Logo" className="h-20" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `font-medium hover:text-secondary ${isActive ? 'text-secondary' : 'text-gray-600'}`}
                onClick={() => setIsOpen(false)}
               >
                {link.label}
              </NavLink>
            ))}

            {user && (
          <NavLink
              
              to={'/admin'}
              className={({ isActive }) => `font-medium hover:text-secondary ${isActive ? 'text-secondary' : 'text-gray-600'}`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            )}

            {/* Login or Logout */}
            {!user ? (
              <Link
                to="/login"
                className="bg-secondary hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow"
              >
                Admin Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-gray-700 hover:text-secondary font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

        {user && (
          <Link
              
              to={'/admin'}
              className="block text-gray-700 hover:text-secondary font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
        )}




          {!user ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block bg-secondary text-white font-semibold px-4 py-2 rounded"
            >
              Admin Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full bg-blue-800 text-white font-semibold px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);