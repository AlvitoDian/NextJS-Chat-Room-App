// contexts/HelloContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface HelloContextType {
  hello: string;
  setHello: (newHello: string) => void;
}

const HelloContext = createContext<HelloContextType | undefined>(undefined);

export const HelloProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hello, setHelloState] = useState("Hello");

  const setHello = (newHello: string) => {
    setHelloState(newHello);
  };

  return (
    <HelloContext.Provider value={{ hello, setHello }}>
      {children}
    </HelloContext.Provider>
  );
};

export const useHello = (): HelloContextType => {
  const context = useContext(HelloContext);
  if (!context) {
    throw new Error("useHello must be used within a HelloProvider");
  }
  return context;
};
