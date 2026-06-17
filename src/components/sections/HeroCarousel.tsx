"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { useAppointmentModal } from "@/components/ui/AppointmentModalProvider";

function usePattern(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  type: string,
  color: string,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth || 1100;
    canvas.height = canvas.offsetHeight || 560;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.5;
    if (type === "cross") {
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    } else if (type === "wave") {
      for (let y = 0; y < canvas.height + 30; y += 30) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const wy = y + Math.sin((x / 60) * Math.PI) * 12;
          x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }
    } else {
      for (let x = 4; x < canvas.width; x += 28)
        for (let y = 4; y < canvas.height; y += 28) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
    }
  }, [type, color, canvasRef]);
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openModal } = useAppointmentModal();
  const slide = HERO_SLIDES[current];

  usePattern(canvasRef, slide.pattern, slide.accent);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [current, animating]);

  return (
    <section
      style={{
        position: "relative",
        height: 580,
        overflow: "hidden",
        background: slide.bg,
        transition: "background 0.7s ease",
      }}
      aria-label="Hero carousel"
    >
      {/* Pattern canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />

      {/* Decorative rings */}
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1.5px solid ${slide.accent}22`,
          transition: "border-color 0.7s",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 50,
          top: 50,
          width: 330,
          height: 330,
          borderRadius: "50%",
          border: `1.5px solid ${slide.accent}33`,
          transition: "border-color 0.7s",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -60,
          bottom: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Tag line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: slide.accent,
              transition: "background 0.7s",
            }}
          />
          <span
            style={{
              color: slide.accent,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontFamily: "Georgia,serif",
              transition: "color 0.7s",
            }}
          >
            St. Elizabeth Catholic Hospital
          </span>
        </div>

        {/* Heading */}
        <h1
          key={`h-${current}`}
          style={{
            fontSize: "clamp(2.4rem,5vw,4rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.08,
            fontFamily: "Georgia,'Times New Roman',serif",
            marginBottom: 18,
            whiteSpace: "pre-line",
            maxWidth: 640,
            animation: "slideUp 0.6s ease forwards",
          }}
        >
          {slide.heading}
        </h1>

        {/* Sub */}
        <p
          key={`s-${current}`}
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.8)",
            maxWidth: 520,
            lineHeight: 1.72,
            marginBottom: 36,
            animation: "slideUp 0.6s ease 0.1s both",
          }}
        >
          {slide.sub}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            animation: "slideUp 0.6s ease 0.2s both",
          }}
        >
          {slide.cta === "Book Appointment" ? (
            <button
              onClick={() => openModal()}
              style={{
                padding: "14px 32px",
                background: slide.accent,
                color: "#0D1F1A",
                border: "none",
                borderRadius: 4,
                fontSize: "0.92rem",
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {slide.cta}
            </button>
          ) : (
            <Link
              href={slide.ctaHref}
              style={{
                display: "inline-block",
                padding: "14px 32px",
                background: slide.accent,
                color: "#0D1F1A",
                borderRadius: 4,
                fontSize: "0.92rem",
                fontWeight: 800,
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {slide.cta}
            </Link>
          )}
          <a
            href="tel:+233322298428"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "transparent",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.38)",
              borderRadius: 4,
              fontSize: "0.92rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.38)")
            }
          >
            +233 322 298 428
          </a>
        </div>
      </div>

      {/* Slide dots */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 9,
          zIndex: 3,
        }}
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background:
                i === current ? slide.accent : "rgba(255,255,255,0.32)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 44,
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: 0.4,
          zIndex: 3,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div style={{ width: 1, height: 36, background: "#fff" }} />
      </div>
    </section>
  );
}
