var y = 9;

interface User {
  id: number;
}

var enhanced = function() {
  return function() {
    if (y === 9) {
      return true;
    }
  }
};

export default {
  enhanced: enhanced
}
