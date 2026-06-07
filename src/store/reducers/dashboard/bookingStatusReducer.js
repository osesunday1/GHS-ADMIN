import {
  GET_BOOKING_STATUS_REQUEST,
  GET_BOOKING_STATUS_SUCCESS,
  GET_BOOKING_STATUS_FAIL,
} from '../../types/types';

const initialState = {
  loading: false,
  statusData: null,
  error: null,
};

const bookingStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_BOOKING_STATUS_SUCCESS:
      return { ...state, loading: false, statusData: action.payload };
    case GET_BOOKING_STATUS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bookingStatusReducer;
