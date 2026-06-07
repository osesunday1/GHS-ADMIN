import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaMoneyBillWave, FaBars, FaSignOutAlt, FaList, FaPlus } from 'react-icons/fa';
import { logout } from '../store/actions/authActions';

const staffLinks = [
  {
    label: 'Expenses',
    icon: <FaMoneyBillWave />,
    children: [
      { label: 'Expense List', path: '/staff/expenses', icon: <FaList /> },
      { label: 'Add Expense', path: '/staff/expenses/add', icon: <FaPlus /> },
    ],
  },
];

const StaffLayout = ({ auth, logout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('Expenses');
  const location = useLocation();
  const navigate = useNavigate();
  const popoutRef = useRef();

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoutRef.current && !popoutRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const user = auth?.user;
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'S';

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 h-screen sticky top-0 bg-secondary-100 transition-all duration-300 flex flex-col overflow-y-auto ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-sm bg-secondary text-white m-4 rounded flex items-center justify-center cursor-pointer"
        >
          <FaBars />
        </button>

        {/* Brand */}
        <div className={`px-4 pb-4 border-b border-gray-200 text-center ${collapsed ? '' : ''}`}>
          {collapsed ? (
            <p className="font-bold text-secondary text-xl">G</p>
          ) : (
            <>
              <p className="font-bold text-secondary text-lg leading-tight">GHS Portal</p>
              <p className="text-xs text-gray-400 mt-0.5">Staff Workspace</p>
            </>
          )}
        </div>

        {/* User info */}
        {!collapsed && user && (
          <div className="px-4 py-3 border-b border-gray-200 bg-white/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500">{user.position || 'Staff'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 flex flex-col p-4 gap-2">
          {staffLinks.map(({ label, icon, children }) => {
            const isDropdownOpen = openDropdown === label;
            const isActive = children?.some((c) => location.pathname.startsWith(c.path));

            return (
              <div key={label} className="relative">
                <div
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : label)}
                  className={`flex items-center justify-between gap-3 p-2 rounded cursor-pointer transition ${
                    isActive ? 'bg-secondary/10 text-secondary' : 'text-gray-700 hover:bg-secondary-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    {!collapsed && <span className="font-medium">{label}</span>}
                  </div>
                </div>

                {/* Expanded dropdown */}
                {!collapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isDropdownOpen ? 'max-h-40 mt-1' : 'max-h-0'
                    }`}
                  >
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`ml-8 flex items-center gap-2 py-2 px-3 text-sm rounded hover:bg-secondary-100 transition ${
                          location.pathname === child.path
                            ? 'text-secondary font-semibold bg-secondary-100'
                            : 'text-gray-600'
                        }`}
                      >
                        <span className="text-xs opacity-70">{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Collapsed pop-out */}
                {collapsed && isDropdownOpen && (
                  <div
                    ref={popoutRef}
                    className="absolute left-20 top-0 z-10 bg-white shadow-lg rounded-xl px-4 py-2 w-48 border border-gray-100"
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide py-2 border-b mb-1">
                      Expenses
                    </p>
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(null);
                        }}
                        className={`flex items-center gap-2 py-2 px-3 text-sm rounded hover:bg-secondary-100 transition ${
                          location.pathname === child.path
                            ? 'text-secondary font-semibold bg-secondary-100'
                            : 'text-gray-600'
                        }`}
                      >
                        <span className="text-xs opacity-70">{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-2 rounded text-gray-600 hover:bg-red-50 hover:text-red-600 transition cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <FaSignOutAlt className="text-lg flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-primary-100 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-primary-100/80 backdrop-blur-sm px-6 py-4 border-b border-gray-200/60 flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500">Welcome back,</p>
            <p className="text-lg font-bold text-gray-800 leading-tight">{user?.name || 'Staff Member'}</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
            Staff Portal
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default connect((state) => ({ auth: state.auth }), { logout })(StaffLayout);
