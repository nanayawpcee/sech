"use client";

import { useState, useEffect } from "react";
import { SITE } from "@/lib/data";

export function EmergencyBanner() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "var(--red)", padding: "2.5rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Subtle texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 90% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />

      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Pulsing dot */}
          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
              transform: pulse ? "scale(1.5)" : "scale(1)", opacity: pulse ? 0 : 0.8,
              transition: "all 1.2s ease",
            }} />
            <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🚨</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-serif)" }}>
              24 / 7 Emergency Services
            </div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.86rem", marginTop: 3 }}>
              Our emergency team is always ready. Don't wait — call us immediately.
            </div>
          </div>
        </div>

        <a
          href={`tel:${SITE.phone}`}
          style={{
            padding: "14px 34px", background: "#fff", color: "var(--red)",
            borderRadius: 4, fontWeight: 900, fontSize: "1.02rem",
            letterSpacing: "0.04em", whiteSpace: "nowrap", flexShrink: 0,
            display: "inline-block", transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          {SITE.phone}
        </a>
      </div>
    </div>
  );
}
