import connect from './src/connect';
import { combineReducers } from 'redux';

console.log(combineReducers);

var x = 1;
if (process.env.NODE_ENV !== 'production') {
  x = 2;
}

var envz = {
  go: function() {
    if (x === 1) {
      return true;
    }
  }
}

export default {
  connect,
  envz
}
