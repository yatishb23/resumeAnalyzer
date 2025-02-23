"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface JobDescriptionContextType {
  jobDescription: string;
  setJobDescription: (desc: string) => void;
}

const JobDescriptionContext = createContext<JobDescriptionContextType | undefined>(undefined);

export const JobDescriptionProvider = ({ children }: { children: ReactNode }) => {
  const [jobDescription, setJobDescription] = useState<string>("");

  return (
    <JobDescriptionContext.Provider value={{ jobDescription, setJobDescription }}>
      {children}
    </JobDescriptionContext.Provider>
  );
};

export const useJobDescription = () => {
  const context = useContext(JobDescriptionContext);
  if (!context) {
    throw new Error("useJobDescription must be used within a JobDescriptionProvider");
  }
  return context;
};
