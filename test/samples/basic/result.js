var reducers = (state, action) => {
    return state || { id: 100 };
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

function combineReducers() {
  var x = 'fake redux ...soo good!';
  return x;
}

console.log(combineReducers);

var x = 1;
if (undefined !== 'production') {
  x = 2;
}

var envz = {
  go: function() {
    if (x === 1) {
      return true;
    }
  }
};

var main = {
  connect,
  envz
};

export default main;
