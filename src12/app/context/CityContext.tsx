"use client";
import { createContext, useContext, useState } from "react";

const CityContext = createContext(null);

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState("All Cities");

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
