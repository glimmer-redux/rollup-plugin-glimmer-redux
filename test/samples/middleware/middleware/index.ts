var warnz = function({dispatch, getState}) {
  console.warn('wait!');
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
};

interface User {
  id: number;
}

export default [warnz];
