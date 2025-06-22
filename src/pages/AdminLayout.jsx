import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaBars, FaStore, FaMoneyBillWave } from 'react-icons/fa';
import { FaHouse } from "react-icons/fa6";
import { IoPersonSharp } from 'react-icons/io5';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const adminLinks = [
  { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
  {
    label: 'Bookings',
    icon: <FaCalendarAlt />,
    children: [
      { label: 'Booking List', path: '/admin/bookings' },
      { label: 'Add Booking', path: '/admin/bookings/add' },
    ],
  },
  { label: 'Guest', path: '/admin/guest', icon: <IoPersonSharp /> },
  { 
    label: 'Market', 
    icon: <FaStore /> ,
    children: [
      { label: 'Inventory List', path: '/admin/inventory' },
      { label: 'Add Product', path: '/admin/inventory/add' },
      { label: 'Sell Product', path: '/admin/inventory/sell' },
      { label: 'Stock History', path: '/admin/inventory/history' },
    ],
    path: '/admin/inventory', 
  },
  {
    label: 'Expenses',
    icon: <FaMoneyBillWave />, // import this from react-icons/fa
    children: [
      { label: 'Expense List', path: '/admin/expenses' },
      { label: 'Add Expense', path: '/admin/expenses/add' },
    ],
  },
  { 
    label: 'Apartments', 
    icon: <FaHouse />,
    children: [
      { label: 'Apartment List', path: '/admin/apartments' },
      { label: 'Add Apartment', path: '/admin/apartments/add' },
    ],
  },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const popoutRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`relative bg-white transition-all duration-300 flex flex-col ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-sm bg-secondary text-white m-4 rounded flex items-center justify-center cursor-pointer"
        >
          <FaBars />
        </button>

        <div className="p-4 font-bold text-secondary text-center border-b">
          {collapsed ? 'A' : 'Admin Panel'}
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-2">
          {adminLinks.map(({ label, path, icon, children }) => {
            const isDropdownOpen = openDropdown === label;
            const hasChildren = children && children.length > 0;

            const isActive =
              location.pathname === path ||
              (hasChildren && children.some((child) => location.pathname.startsWith(child.path)));

            const handleParentClick = () => {
              if (hasChildren) {
                setOpenDropdown(isDropdownOpen ? null : label);
              } else {
                setOpenDropdown(null);
                navigate(path);
              }
            };

            return (
              <div key={label} className="relative">
                {/* Parent */}
                <div
                  onClick={handleParentClick}
                  className={`flex items-center justify-between gap-3 p-2 rounded cursor-pointer hover:bg-secondary-100 transition ${
                    isActive ? 'bg-secondary-100 text-secondary' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    {!collapsed && <span>{label}</span>}
                  </div>

                  {hasChildren && !collapsed && (
                    <span
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <FiChevronDown />
                    </span>
                  )}
                </div>

                {/* Dropdown for expanded sidebar */}
                {hasChildren && !collapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isDropdownOpen ? 'max-h-40 mt-1' : 'max-h-0'
                    }`}
                  >
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setOpenDropdown(null)}
                        className={`ml-8 block py-2 px-3 text-sm rounded hover:bg-secondary-100 transition ${
                          location.pathname === child.path
                            ? 'text-secondary font-semibold bg-secondary-100'
                            : 'text-gray-600'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pop-out for collapsed sidebar */}
                {hasChildren && collapsed && isDropdownOpen && (
                  <div
                    ref={popoutRef}
                    className="absolute left-20 top-0 z-10 bg-white shadow-lg rounded px-4 py-2 w-48"
                  >
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(null);
                        }}
                        className={`block py-2 px-3 text-sm rounded hover:bg-secondary-100 transition ${
                          location.pathname === child.path
                            ? 'text-secondary font-semibold bg-secondary-100'
                            : 'text-gray-600'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-primary-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;