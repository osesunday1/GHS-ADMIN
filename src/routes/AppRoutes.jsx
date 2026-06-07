import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import AdminLayout from '../pages/AdminLayout';
import StaffLayout from '../pages/StaffLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Dashboard from '../features/Dashboard/Dashboard';
import Bookings from '../features/Dashboard/bookings/Bookings';
import AddBooking from '../features/Dashboard/bookings/AddBooking';
import Guest from '../features/Dashboard/guest/Guest';
import Apartments from '../features/Dashboard/apartments/Apartments';
import AddApartment from '../features/Dashboard/apartments/AddApartment';
import Inventory from '../features/Dashboard/Market/Inventory';
import AddInventory from '../features/Dashboard/Market/AddInventory';
import SellProduct from '../features/Dashboard/Market/SellProduct';
import StockHistory from '../features/Dashboard/Market/StockHistory';
import Expenses from '../features/Dashboard/expenses/Expenses';
import AddExpense from '../features/Dashboard/expenses/AddExpense';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin portal — admins only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']} fallback="/staff/expenses">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/add" element={<AddBooking />} />
        <Route path="guest" element={<Guest />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/add" element={<AddInventory />} />
        <Route path="inventory/sell" element={<SellProduct />} />
        <Route path="inventory/history" element={<StockHistory />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="expenses/add" element={<AddExpense />} />
        <Route path="apartments" element={<Apartments />} />
        <Route path="apartments/add" element={<AddApartment />} />
      </Route>

      {/* Staff portal — staff only */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={['staff']} fallback="/admin">
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route path="expenses" element={<Expenses basePath="/staff/expenses" />} />
        <Route path="expenses/add" element={<AddExpense basePath="/staff/expenses" />} />
      </Route>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;