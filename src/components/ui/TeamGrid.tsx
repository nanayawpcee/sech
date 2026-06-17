"use client";

import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  dept: string;
  initials: string;
}

interface Props {
  members: TeamMember[];
}

export function TeamGrid({ members }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.25rem" }}>
      {members.map((member, i) => (
        <div
          key={member.name}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            textAlign: "center",
            padding: "1.75rem 1.25rem",
            background: "#fff",
            borderRadius: "var(--radius-md)",
            border: "1.5px solid #E2EBE7",
            transition: "all 0.25s",
            cursor: "default",
            transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hovered === i ? "var(--shadow-hover)" : "none",
            opacity: 0,
            animation: `slideUp 0.5s ease ${i * 70}ms forwards`,
          }}
        >
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: hovered === i ? "var(--primary-light)" : "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#fff",
            margin: "0 auto 14px",
            fontFamily: "var(--font-serif)",
            transition: "background 0.25s",
          }}>
            {member.initials}
          </div>
          <div style={{ fontWeight: 700, color: "var(--text-dark)", fontSize: "0.95rem", marginBottom: 4 }}>
            {member.name}
          </div>
          <div style={{ color: "var(--primary-light)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 3 }}>
            {member.role}
          </div>
          <div style={{ color: "var(--text-light)", fontSize: "0.74rem" }}>
            {member.dept}
          </div>
        </div>
      ))}
    </div>
  );
}
