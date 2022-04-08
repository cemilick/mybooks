const initialState = {
  connected: false,
  loading: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONNECTED':
      return {
        ...state,
        connected: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
