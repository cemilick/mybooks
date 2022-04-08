const initialState = {
  books: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECOMMENDED_BOOKS':
      return {
        ...state,
        books: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
