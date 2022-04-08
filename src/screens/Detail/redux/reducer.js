const initialState = {
  detailBooks: {},
};

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DETAIL_BOOKS':
      return {
        ...state,
        detailBooks: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
