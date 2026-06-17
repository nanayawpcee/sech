"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { AppointmentModal } from "@/components/ui/AppointmentModal";

interface ModalContextValue {
  openModal: (dept?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  openModal: () => {},
  closeModal: () => {},
});

export function useAppointmentModal() {
  return useContext(ModalContext);
}

export function AppointmentModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefillDept, setPrefillDept] = useState<string | undefined>();

  const openModal = useCallback((dept?: string) => {
    setPrefillDept(dept);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {open && (
        <AppointmentModal onClose={closeModal} prefillDept={prefillDept} />
      )}
    </ModalContext.Provider>
  );
}
