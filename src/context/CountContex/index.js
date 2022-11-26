import CountReducer from "context/CountReducer";
import { createContext, useReducer } from "react";

const initialState = {
  count: 0,
};

export const CountContex = createContext(initialState);

export const CountContexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CountReducer, initialState);
  // Global State
  // const [count, setCount] = useState(0);

  // Action On Global State
  // const dispatch = (action) => {
  //   if (action.type === "PLUS") {
  //     setCount(count + 1);
  //   }

  //   if (action.type === "MINUS") {
  //     if (count === 0) {
  //       setCount(0);
  //     } else {
  //       setCount(count - 1);
  //     }
  //   }
  // };

  // Provider
  return (
    <CountContex.Provider value={{ count: state.count, dispatch }}>
      {children}
    </CountContex.Provider>
  );
};
