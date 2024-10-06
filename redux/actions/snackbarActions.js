export const showSnackbar = (message) => {
  return {
    type: 'SHOW_SNACKBAR',
    payload: message,
  };
};

export const hideSnackbar = () => {
  return {
    type: 'HIDE_SNACKBAR',
  };
};
  