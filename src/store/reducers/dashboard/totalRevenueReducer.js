import {
  GET_TOTAL_REVENUE_REQUEST,
  GET_TOTAL_REVENUE_SUCCESS,
  GET_TOTAL_REVENUE_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  totalRevenueData: null,
  error: null,
};

const totalRevenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_REVENUE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOTAL_REVENUE_SUCCESS:
      return {
        ...state,
        loading: false,
        totalRevenueData: action.payload,
      };
    case GET_TOTAL_REVENUE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default totalRevenueReducer;