import { createContext, useState, useContext } from "react";

const TypeWriterContext = createContext();

export function TypeWriterProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const nextSequence = () => {
    setActiveLine(0);
    setActiveIndex((prev) => prev + 1);
  };

  const nextLine = () => {
    setActiveLine((prev) => prev + 1);
  };

  return (
    <TypeWriterContext.Provider
      value={{
        activeIndex,
        activeLine,
        nextSequence,
        nextLine,
        isComplete,
        setIsComplete,
      }}
    >
      {children}
    </TypeWriterContext.Provider>
  );
}

export const useTypeWriter = () => useContext(TypeWriterContext);
