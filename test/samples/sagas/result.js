var reducers = (state, action) => {
    return state || { id: 100 };
};

var enhancers = function() {};

var warnz = function ({ dispatch, getState }) {
    console.warn('sagass');
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        return next(action);
    };
};
var middlewares = [warnz];

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
