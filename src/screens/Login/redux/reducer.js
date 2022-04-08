const initialState = {
  token: null,
  name: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};
