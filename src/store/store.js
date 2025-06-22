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


const rootReducer = combineReducers({
  auth: authReducer, // ✅ name must match what you're using in `mapStateToProps`
  bookings: bookingsReducer,
  apartments:apartmentsReducer,
  guests:guestReducer,
  inventory: inventoryReducer,
  stock: stockReducer,
  expenses: expenseReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store