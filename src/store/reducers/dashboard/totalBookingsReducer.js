import {
  GET_TOTAL_BOOKINGS_REQUEST,
  GET_TOTAL_BOOKINGS_SUCCESS,
  GET_TOTAL_BOOKINGS_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  totalBookingsData: null,
  error: null,
};

const adminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_BOOKINGS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOTAL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        totalBookingsData: action.payload,
      };
    case GET_TOTAL_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminDashboardReducer;