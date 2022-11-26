import CountReducer from "context/CountReducer";

const { createContext, useReducer } = require("react");

const INITIAL_STATE = {
  count: 0,
};

export const CountContex = createContext(INITIAL_STATE);

export const CountContexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CountReducer, INITIAL_STATE);

  return (
    <CountContex.Provider value={{ count: state.count, dispatch }}>
      {children}
    </CountContex.Provider>
  );
};
