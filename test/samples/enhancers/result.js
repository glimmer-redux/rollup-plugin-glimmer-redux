var reducers = (state, action) => {
    return state || { id: 100 };
};

var y = 9;
var enhanced = function () {
    return function () {
        if (y === 9) {
            return true;
        }
    };
};
var enhancers = {
    enhanced: enhanced
};

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
