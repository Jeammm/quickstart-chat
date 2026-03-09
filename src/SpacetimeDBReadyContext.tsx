import { createContext, useContext } from "react";

export const SpacetimeDBReadyContext = createContext(false);

export function useSpacetimeDBReady(): boolean {
  return useContext(SpacetimeDBReadyContext);
}
