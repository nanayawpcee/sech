"use client";

import { useState } from "react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hoveredStyle?: React.CSSProperties;
}

export function HoverCard({ children, style = {}, hoveredStyle = {} }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...style, ...(hovered ? hoveredStyle : {}) }}
    >
      {children}
    </div>
  );
}
