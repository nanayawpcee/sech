"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { useAppointmentModal } from "@/components/ui/AppointmentModalProvider";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  preview?: boolean;
}

export function ServicesGrid({ preview = false }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { openModal } = useAppointmentModal();
  const isMobile = useIsMobile();
  
  const displayed = preview ? SERVICES.slice(0, 4) : SERVICES;

  return (
    <section 
      id="services" 
      style={{ 
        padding: isMobile ? "4rem 1rem" : "6rem 2rem", 
        background: "#F7F9F7" 
      }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <AnimateIn>
          <div style={{ 
            marginBottom: "3.5rem", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-end", 
            flexWrap: "wrap", 
            gap: 16 
          }}>
            <div>
              <div className="section-tag"><span>What We Offer</span></div>
              <h2 className="section-heading">Comprehensive Medical Services</h2>
              <p style={{ 
                color: "var(--text-light)", 
                maxWidth: 480, 
                marginTop: 10, 
                lineHeight: 1.7 
              }}>
                From emergency medicine to specialized clinics — SECH delivers expert care under one roof, every day of the year.
              </p>
            </div>
            {preview && (
              <Link href="/services" style={{ 
                color: "var(--primary)", 
                fontWeight: 700, 
                fontSize: "0.88rem", 
                letterSpacing: "0.06em", 
                flexShrink: 0 
              }}>
                View All Services →
              </Link>
            )}
          </div>
        </AnimateIn>

        {/* Grid - FIXED FOR MOBILE */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile 
            ? "repeat(auto-fit, minmax(280px, 1fr))"   // Better for mobile
            : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? "1rem" : "1.25rem",
          width: "100%",
          maxWidth: "100%",
        }}>
          {displayed.map((svc, i) => (
            <AnimateIn key={svc.slug} delay={i * 55}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: hovered === i ? "var(--primary)" : "#fff",
                  border: `1.5px solid ${hovered === i ? "var(--primary)" : "#E2EBE7"}`,
                  borderRadius: "var(--radius-md)",
                  padding: isMobile ? "1.5rem" : "1.65rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: hovered === i ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hovered === i ? "var(--shadow-hover)" : "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",           // ← Critical
                  boxSizing: "border-box",
                }}
              >
                <div style={{ fontSize: isMobile ? 26 : 28, marginBottom: 14 }}>
                  <img src={svc.icon} alt={svc.title} style={{ width: "20%", height: "auto" }} />
                </div>

                <h3 style={{ 
                  fontSize: isMobile ? "1.05rem" : "0.97rem", 
                  fontWeight: 700, 
                  color: hovered === i ? "#fff" : "var(--text-dark)", 
                  margin: "0 0 8px", 
                  fontFamily: "var(--font-serif)" 
                }}>
                  {svc.title}
                </h3>
                
                <p style={{ 
                  fontSize: isMobile ? "0.9rem" : "0.83rem", 
                  color: hovered === i ? "rgba(255,255,255,0.72)" : "var(--text-light)", 
                  lineHeight: 1.65, 
                  margin: 0, 
                  flex: 1 
                }}>
                  {svc.shortDesc}
                </p>

                <div style={{ marginTop: "1.25rem", display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openModal?.(svc.title); }}
                    style={{
                      padding: "8px 16px",
                      background: hovered === i ? "#fff" : "var(--primary)",
                      color: hovered === i ? "var(--primary)" : "#fff",
                      border: "none",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    BOOK NOW
                  </button>
                  <Link 
                    href={`/services/${svc.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      padding: "8px 16px", 
                      color: hovered === i ? "var(--accent)" : "var(--primary)", 
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}