import { createContext, useState } from "react";

export const CountContex = createContext();

export const CountContexProvider = ({ children }) => {
  // Global State
  const [count, setCount] = useState(0);

  // Action On Global State
  const dispatch = (action) => {
    if (action.type === "PLUS") {
      setCount(count + 1);
    }

    if (action.type === "MINUS") {
      if (count === 0) {
        setCount(0);
      } else {
        setCount(count - 1);
      }
    }
  };

  // Provider
  return (
    <CountContex.Provider value={{ state: { count }, dispatch }}>
      {children}
    </CountContex.Provider>
  );
};
