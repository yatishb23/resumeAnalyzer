"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ScoreContextType {
  scoreResult: string | null;
  setScoreResult: (score: string | null) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [scoreResult, setScoreResult] = useState<string | null>(null);

  return (
    <ScoreContext.Provider value={{ scoreResult, setScoreResult }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
