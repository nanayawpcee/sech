"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "right";
}

export function AnimateIn({ children, delay = 0, className, style, direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const translate =
    direction === "left"  ? "translateX(-32px)" :
    direction === "right" ? "translateX(32px)"  :
                            "translateY(32px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translate(0)" : translate,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
