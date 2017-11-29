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

var one = (state, action) => {
    if (action.type === 'ONE') {
        return Object.assign({}, state, { one: 'done' });
    }
    return state || { one: 'one' };
};

var two = (state, action) => {
    if (action.type === 'TWO') {
        return Object.assign({}, state, { two: 'done' });
    }
    return state || { two: 'two' };
};

var smore = {
    one,
    two
};

var wat = (state, action) => {
    if (action.type === 'WAT') {
        return Object.assign({}, state, { wat: 'done' });
    }
    return state || { wat: 'wat' };
};

const number = (state, action) => {
    if (action.type === 'ADD') {
        return state.value + 1;
    }
    return state || { value: 1 };
};
var reducers = {
    number,
    todos,
    smore,
    wat
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
