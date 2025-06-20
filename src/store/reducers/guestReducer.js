import {
  GET_GUESTS_REQUEST,
  GET_GUESTS_SUCCESS,
  GET_GUESTS_FAIL,
  UPDATE_GUEST_REQUEST,
  UPDATE_GUEST_SUCCESS,
  UPDATE_GUEST_FAIL,
} from '../types/types';

const initialState = {
  guests: [],
  loading: false,
  error: null,
};

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GUESTS_REQUEST:
    case UPDATE_GUEST_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_GUESTS_SUCCESS:
      return { ...state, loading: false, guests: action.payload };
    case UPDATE_GUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        guests: state.guests.map((g) =>
          g._id === action.payload._id ? action.payload : g
        ),
      };
    case GET_GUESTS_FAIL:
    case UPDATE_GUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default guestReducer;