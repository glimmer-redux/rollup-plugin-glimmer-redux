const initialState = {
    filter: false,
    all: {
        1: {
            id: 1,
            text: 'Use Glimmer Redux'
        }
    }
};
var todos = (state, action) => {
    if (action.type === 'SHOW_ACTIVE') {
        return Object.assign({}, state, { filter: false });
    }
    return state || initialState;
};

const number = (state, action) => {
    if (action.type === 'ADD') {
        return state.value + 1;
    }
    return state || { value: 1 };
};
var reducers = {
    number,
    todos
};

var enhancers = function() {};

var middlewares = [];

let store$1;
const makeStoreInstance = () => {
  let createStoreWithMiddleware = function() {
    return function() {
      let fakeStore = {
        reducers: reducers,
        enhancers: enhancers,
        middlewares: middlewares
      };
      return fakeStore;
    }
  };
  store$1 = createStoreWithMiddleware();
  return store$1;
};

let store = makeStoreInstance();

var connect = {
  store
};

var main = {
  connect
};

export default main;
