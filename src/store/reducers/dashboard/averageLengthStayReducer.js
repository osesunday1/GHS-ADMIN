import {
  GET_AVG_LENGTH_STAY_REQUEST,
  GET_AVG_LENGTH_STAY_SUCCESS,
  GET_AVG_LENGTH_STAY_FAIL
} from '../../types/types';

const initialState = {
  loading: false,
  averageStayData: null,
  error: null,
};

const averageLengthStayReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVG_LENGTH_STAY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_AVG_LENGTH_STAY_SUCCESS:
      return {
        ...state,
        loading: false,
        averageStayData: action.payload,
      };
    case GET_AVG_LENGTH_STAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default averageLengthStayReducer;
