import reducers from './reducers/index';
import enhancers from './enhancers/index';
import middlewares from './middleware/index';

let store;
const makeStoreInstance = () => {
  let createStoreWithMiddleware = function() {
    return function() {
      let fakeStore = {
        reducers: reducers,
        enhancers: enhancers,
        middlewares: middlewares
      }
      return fakeStore;
    }
  }
  store = createStoreWithMiddleware();
  return store;
}

export default makeStoreInstance;
