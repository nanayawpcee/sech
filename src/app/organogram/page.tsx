import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { OrgChart } from "@/components/ui/OrgChart";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { EmergencyBanner } from "@/components/sections/EmergencyBanner";

export const metadata: Metadata = {
  title: "Organogram",
  description:
    "The organisational structure of St. Elizabeth Catholic Hospital — Goaso Diocesan Health Service.",
};

export default function OrganogramPage() {
  return (
    <>
      <PageHero
        tag="Our Structure"
        title="Organisational Chart"
        subtitle="The governance and operational structure of St. Elizabeth Catholic Hospital under the Goaso Diocesan Health Service."
      />

      {/* Intro strip */}
      <section style={{ background: "#fff", padding: "4rem 2rem 0" }}>
        <div className="container">
          <AnimateIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.25rem",
                marginBottom: "3rem",
              }}
            >
              {[
                {
                  icon: "⛪",
                  label: "Bishop of Goaso Diocese",
                  desc: "Supreme spiritual and administrative authority over all diocesan health institutions.",
                },
                {
                  icon: "🏛️",
                  label: "Health Service Board",
                  desc: "Governance board that sets policy and strategic direction for diocesan health services.",
                },
                {
                  icon: "🩺",
                  label: "Medical Director",
                  desc: "Leads all clinical operations, specialist services, and public health programmes.",
                },
                {
                  icon: "📋",
                  label: "Administrator",
                  desc: "Manages HR, finance, logistics, transport, facilities, and all support departments.",
                },
                {
                  icon: "👩‍⚕️",
                  label: "Nurse Manager",
                  desc: "Oversees nursing staff, midwives, nurse specialists, and ward assistants.",
                },
                {
                  icon: "✝️",
                  label: "Chaplain",
                  desc: "Provides pastoral care and spiritual support to patients, staff, and their families.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "var(--off-white)",
                    border: "1.5px solid #E2EBE7",
                    borderRadius: 8,
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--text-dark)",
                      fontSize: "0.88rem",
                      marginBottom: 5,
                      fontFamily: "Georgia,serif",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.8rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Org chart */}
      <section style={{ background: "#fff", padding: "0 2rem 5rem" }}>
        <div className="container" style={{ maxWidth: "100%" }}>
          <AnimateIn>
            <div
              style={{
                background: "var(--off-white)",
                border: "1.5px solid #D6E8DF",
                borderRadius: 12,
                padding: "2rem",
                overflowX: "auto",
              }}
            >
              <OrgChart />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Download note */}
      <section
        style={{ background: "var(--light-green)", padding: "3rem 2rem" }}
      >
        <div className="container">
          <AnimateIn>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "var(--text-dark)",
                    margin: "0 0 6px",
                  }}
                >
                  Goaso Diocesan Health Service
                </h3>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: 540,
                  }}
                >
                  St. Elizabeth Catholic Hospital operates under the governance
                  of the Goaso Diocesan Health Service Board, in alignment with
                  the Catholic Diocese of Goaso and the Christian Health
                  Association of Ghana (CHAG).
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["CHAG Member", "GHS Accredited", "MOH Approved"].map((b) => (
                  <span
                    key={b}
                    style={{
                      padding: "7px 16px",
                      background: "#fff",
                      border: "1.5px solid #B6D9C8",
                      borderRadius: 4,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <EmergencyBanner />
    </>
  );
}
