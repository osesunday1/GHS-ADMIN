import {
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAIL,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_SUCCESS,
} from '../types/types';

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case GET_EXPENSES_SUCCESS:
      return { ...state, loading: false, expenses: action.payload };
    case GET_EXPENSES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_EXPENSE_SUCCESS:
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.filter(e => e._id !== action.payload),
      };
    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.map(e =>
          e._id === action.payload._id ? action.payload : e
        ),
      };
    default:
      return state;
  }
};

export default expenseReducer;