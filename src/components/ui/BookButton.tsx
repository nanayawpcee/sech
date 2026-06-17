"use client";

import { useAppointmentModal } from "@/components/ui/AppointmentModalProvider";

interface Props {
  dept?: string;
  label?: string;
  style?: React.CSSProperties;
}

export function BookButton({ dept, label = "Book Appointment", style }: Props) {
  const { openModal } = useAppointmentModal();
  return (
    <button
      onClick={() => openModal(dept)}
      className="btn-accent"
      style={style}
    >
      {label}
    </button>
  );
}
