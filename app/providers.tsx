"use client";

import { createContext, useState } from "react";

export const AppContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  // Global state object (combination of all global state variables) to be passed to all components via context
  // Each of the state variables can be accessed across the app like so: const { state, action } = useContext(AppContext);
  const globalState = {
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
}
