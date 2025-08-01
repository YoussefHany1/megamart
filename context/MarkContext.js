"use client";
import { createContext, useState, useContext } from "react";

const MarkContext = createContext();

export function MarkProvider({ children }) {
  const [showMark, setShowMark] = useState(false);

  return (
    <MarkContext.Provider value={{ showMark, setShowMark }}>
      {children}
    </MarkContext.Provider>
  );
}

export const useMark = () => useContext(MarkContext);
