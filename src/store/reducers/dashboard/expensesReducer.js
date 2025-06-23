import {
  GET_TOTAL_EXPENSES_REQUEST,
  GET_TOTAL_EXPENSES_SUCCESS,
  GET_TOTAL_EXPENSES_FAILURE
} from '../../types/types';

const initialState = {
  loading: false,
  totalExpenses: 0,
  breakdown: [],
  error: null,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case GET_TOTAL_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        totalExpenses: action.payload.totalExpenses,
        breakdown: action.payload.breakdown,
        error: null
      };
    case GET_TOTAL_EXPENSES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default expensesReducer;