// ============================
// Step 2: Create Redux Store
// File: src/store/store.js
// ============================

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer'; 
import bookingsReducer from './reducers/bookingsReducer';
import apartmentsReducer from './reducers/apartmentReducer';
import guestReducer from './reducers/guestReducer';
import inventoryReducer from './reducers/inventoryReducer';
import stockReducer from './reducers/stockReducer';
import expenseReducer from './reducers/expenseReducer';
import totalBookingsReducer from './reducers/dashboard/totalBookingsReducer'
import totalRevenueReducer from './reducers/dashboard/totalRevenueReducer';
import marketProfitReducer from './reducers/dashboard/marketProfitReducer';
import averageLengthStayReducer from './reducers/dashboard/averageLengthStayReducer';
import repeatGuestReducer from './reducers/dashboard/repeatGuestReducer';
import revenuePerApartmentReducer from './reducers/dashboard/revenuePerApartmentReducer';
import topProductsReducer from './reducers/dashboard/topProductsReducer';
import lowStockReducer from './reducers/dashboard/lowStockReducer';
import expensesReducer from './reducers/dashboard/expensesReducer'; 



const rootReducer = combineReducers({
  auth: authReducer, // ✅ name must match what you're using in `mapStateToProps`
  bookings: bookingsReducer,
  apartments:apartmentsReducer,
  guests:guestReducer,
  inventory: inventoryReducer,
  stock: stockReducer,
  expenses: expenseReducer,
  totalBookings:totalBookingsReducer,
  totalRevenue: totalRevenueReducer,
  marketProfit: marketProfitReducer,
  averageLengthStay: averageLengthStayReducer,
  repeatGuest: repeatGuestReducer,
  revenuePerApartment: revenuePerApartmentReducer,
  topProducts: topProductsReducer,
  lowStock: lowStockReducer,
  expenseDashboard: expensesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store