import {
  GET_TOTAL_MARKET_REQUEST,
  GET_TOTAL_MARKET_SUCCESS,
  GET_TOTAL_MARKET_FAIL
} from '../../types/types';

const initialState = {
  marketProfitData: null,
  loading: false,
  error: null
};

const marketProfitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_MARKET_REQUEST:
      return { ...state, loading: true };

    case GET_TOTAL_MARKET_SUCCESS:
      return {
        ...state,
        loading: false,
        marketProfitData: action.payload, // ✅ This must match
        error: null
      };

    case GET_TOTAL_MARKET_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default marketProfitReducer;