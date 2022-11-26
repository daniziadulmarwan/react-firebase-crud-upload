const CountReducer = (state, action) => {
  // if (action.type === "PLUS") {
  //   return (state.count = state.count + 1);
  // }
  // if (action.type === "MINUS") {
  //   if (state.count === 0) {
  //     return (state = 0);
  //   } else {
  //     return (state = state.count - 1);
  //   }
  // }
  // return state;
  switch (action.type) {
    case "PLUS":
      return {
        count: state.count + 1,
      };
    case "MINUS":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default CountReducer;
