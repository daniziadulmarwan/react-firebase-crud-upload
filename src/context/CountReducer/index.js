const CountReducer = (state, action) => {
  switch (action.type) {
    case "PLUS":
      return {
        count: state.count + 1,
      };
    case "MINUS":
      return {
        count: state.count === 0 ? 0 : state.count - 1,
      };
    default:
      return state;
  }
};

export default CountReducer;
