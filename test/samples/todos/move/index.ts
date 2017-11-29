import todos from './todos';

interface User {
  id: number;
}

const number = (state:any, action:any):any => {
  if(action.type === 'ADD') {
    return state.value + 1;
  }
  return state || {value: 1};
};

export default {
  number,
  todos
};
