export const setConnected = payload => {
  return {
    type: 'SET_CONNECTED',
    payload: payload,
  };
};

export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload: payload,
  };
};
