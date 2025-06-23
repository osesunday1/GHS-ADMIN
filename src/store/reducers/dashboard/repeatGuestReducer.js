import {
  GET_REPEAT_GUESTS_REQUEST,
  GET_REPEAT_GUESTS_SUCCESS,
  GET_REPEAT_GUESTS_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  repeatGuestData: null,
  error: null,
};

const repeatGuestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPEAT_GUESTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_REPEAT_GUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        repeatGuestData: action.payload,
      };
    case GET_REPEAT_GUESTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default repeatGuestReducer;