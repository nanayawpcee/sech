import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AdminShellSuppressor } from "../components/layout/AdminShellSuppressor";

export const metadata: Metadata = {
  title: {
    default: "St. Elizabeth Catholic Hospital | Hwidiem, Ghana",
    template: "%s | St. Elizabeth Catholic Hospital",
  },
  description:
    "St. Elizabeth Catholic Hospital (SECH) provides world-class, compassionate Catholic healthcare to the communities of Ghana's Ahafo Region. A CHAG member institution.",
  keywords: [
    "hospital",
    "Ghana",
    "CHAG",
    "Hwidiem",
    "healthcare",
    "Catholic hospital",
  ],
  openGraph: {
    title: "St. Elizabeth Catholic Hospital",
    description: "Healing with Faith & Excellence — Ahafo Region, Ghana",
    url: "https://sech-gh.org",
    siteName: "SECH Ghana",
    locale: "en_GH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AdminShellSuppressor>{children}</AdminShellSuppressor>
        </AuthProvider>
      </body>
    </html>
  );
}
