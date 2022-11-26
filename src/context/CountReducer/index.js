const CountReducer = (state, action) => {
  if (action.type === "PLUS") {
    return (state.count += 1);
  }

  if (action.type === "MINUS") {
    if (state.count === 0) {
      state.count = 0;
    } else {
      state.count -= 1;
    }
  }

  return state;

  // switch (action.type) {
  //   case "PLUS":
  //     return {
  //       count: action.payload,
  //     };
  //   case "MINUS":
  //     return {
  //       count: action.payload,
  //     };
  //   default:
  //     return state;
  // }
};

export default CountReducer;
