export default(state, action) => {
  if(action.type === 'ONE') {
    return Object.assign({}, state, {one: 'done'});
  }
  return state || {one: 'one'};
};
