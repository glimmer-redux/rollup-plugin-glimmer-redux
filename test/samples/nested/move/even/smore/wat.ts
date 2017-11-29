interface Wat {
  wat: string;
}

export default(state:Wat, action:any):Wat => {
  if(action.type === 'WAT') {
    return {
      ...state,
      wat: 'done'
    }
  }
  return state || {wat: 'wat'};
};
