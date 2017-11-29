const initialState = {
  filter: false,
  all: {
    1: {
      id: 1,
      text: 'Use Glimmer Redux'
    }
  }
};

interface Todos {
  filter: boolean;
  all: Record<T>;
}

export default (state:Todos, action:any):Todos => {
  if(action.type === 'SHOW_ACTIVE') {
    return {
      ...state,
      filter: false
    }
  }
  return state || initialState;
}
