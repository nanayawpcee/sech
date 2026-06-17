"use client";

import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  baseStyle?: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

export function HoverLink({ href, children, baseStyle = {}, hoverStyle = {}, style = {} }: Props) {
  return (
    <Link
      href={href}
      style={{ ...baseStyle, ...style }}
      onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, baseStyle)}
    >
      {children}
    </Link>
  );
}
