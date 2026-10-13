import { createContext, useContext, useMemo, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/utils/storage";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useLocalStorage(STORAGE_KEYS.location, "");
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({ location, setLocation, open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }),
    [location, setLocation, open]
  );
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export const useDeliveryLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useDeliveryLocation must be used inside LocationProvider");
  return ctx;
};
