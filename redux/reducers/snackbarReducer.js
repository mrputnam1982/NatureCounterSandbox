const initialState = {
    message: '',
    visible: false,
};
  
const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return { message: action.payload, visible: true };
    case 'HIDE_SNACKBAR':
      return { ...state, visible: false };
    default:
      return state;
  }
};
  
export default snackbarReducer;
  