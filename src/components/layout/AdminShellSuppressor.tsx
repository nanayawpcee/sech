"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AppointmentModalProvider } from "../ui/AppointmentModalProvider";




export function AdminShellSuppressor({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Don't show navbar and footer on admin pages
    return <>{children}</>;
  }

  return(
    <AppointmentModalProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AppointmentModalProvider>
  )
}
