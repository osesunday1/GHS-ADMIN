import {
  GET_BOOKINGS_REQUEST,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAIL,
} from '../types/types';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BOOKINGS_SUCCESS:
      return { ...state, loading: false, bookings: action.payload };
    case GET_BOOKINGS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bookingsReducer;