export default(state, action) => {
  if(action.type === 'TWO') {
    return {
      ...state,
      two: 'done'
    }
  }
  return state || {two: 'two'};
};
