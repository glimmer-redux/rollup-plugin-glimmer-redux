interface User {
  id: number;
}

export default (state:User, action:any):User => {
  return state || {id: 100};
};
