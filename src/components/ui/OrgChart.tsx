"use client";

import { useState } from "react";

/* ─── Colour tokens ─── */
const S = {
  gov:    { bg: "#fff",     bd: "#111",    tx: "#111"    },
  md:     { bg: "#FFF3CD", bd: "#C8960C", tx: "#5C4400" },
  chap:   { bg: "#FFF8F0", bd: "#E65100", tx: "#BF360C" },
  adm:    { bg: "#EEF4FF", bd: "#1565C0", tx: "#1A237E" },
  nur:    { bg: "#E8F5E9", bd: "#2E7D32", tx: "#1B5E20" },
  aud:    { bg: "#F3E5F5", bd: "#6A1B9A", tx: "#4A148C" },
  subMd:  { bg: "#fff",    bd: "#C8960C", tx: "#5C4400" },
  subAdm: { bg: "#fff",    bd: "#1565C0", tx: "#1A237E" },
  subNur: { bg: "#E8F5E9", bd: "#2E7D32", tx: "#1B5E20" },
};
type SK = keyof typeof S;

/* ─── Primitives ─── */
function VLine({ h = 12, color = "#777" }: { h?: number; color?: string }) {
  return <div style={{ width: 1.5, height: h, background: color, margin: "0 auto", flexShrink: 0 }} />;
}

function TopBox({ label }: { label: string }) {
  return (
    <div style={{
      background: "#fff", border: "2px solid #111", color: "#111",
      borderRadius: 3, padding: "5px 18px", fontSize: 10,
      fontWeight: 800, whiteSpace: "nowrap", minWidth: 200, textAlign: "center",
    }}>{label}</div>
  );
}

function DeptBox({
  label, sk, hasChildren, collapsed, onToggle,
}: {
  label: string; sk: SK; hasChildren?: boolean; collapsed?: boolean; onToggle?: () => void;
}) {
  const s = S[sk];
  return (
    <div
      onClick={onToggle}
      style={{
        background: s.bg, border: `1.5px solid ${s.bd}`, color: s.tx,
        borderRadius: 3, padding: "5px 10px", fontSize: 9.5, fontWeight: 800,
        lineHeight: 1.3, minWidth: 90, textAlign: "center",
        cursor: hasChildren ? "pointer" : "default",
        position: "relative",
        transition: "opacity 0.15s",
        userSelect: "none",
      }}
      onMouseEnter={e => { if (hasChildren) (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
    >
      {label}
      {/* +/– toggle badge */}
      {hasChildren && (
        <div style={{
          position: "absolute", bottom: -9, left: "50%", transform: "translateX(-50%)",
          width: 16, height: 16, borderRadius: "50%",
          background: s.bd, color: s.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 900, lineHeight: 1,
          border: `1.5px solid ${s.bg}`, zIndex: 2,
        }}>
          {collapsed ? "+" : "−"}
        </div>
      )}
    </div>
  );
}

function SubBox({ label, sk, width = 80 }: { label: string; sk: SK; width?: number }) {
  const s = S[sk];
  return (
    <div style={{
      background: s.bg, border: `1.5px solid ${s.bd}`, color: s.tx,
      borderRadius: 3, padding: "3px 5px", fontSize: 8, fontWeight: 700,
      lineHeight: 1.3, width, textAlign: "center",
    }}>{label}</div>
  );
}

function LeafBox({ label, sk, width = 80 }: { label: string; sk: SK; width?: number }) {
  const s = S[sk];
  return (
    <div style={{
      background: "#fff", border: `1px solid ${s.bd}`, color: s.tx,
      borderRadius: 2, padding: "2px 5px", fontSize: 7.5, fontWeight: 600,
      lineHeight: 1.3, width, textAlign: "center",
    }}>{label}</div>
  );
}

/* Stacked leaf column with no gaps between items */
function LeafStack({ items, sk, width = 82 }: { items: string[]; sk: SK; width?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map(item => <LeafBox key={item} label={item} sk={sk} width={width} />)}
    </div>
  );
}

/* ─── Main OrgChart ─── */
export function OrgChart() {
  const [zoom, setZoom] = useState(0.85);

  /* Per-dept collapsed state */
  const [mdOpen, setMdOpen]     = useState(true);
  const [chapOpen, setChapOpen] = useState(true);
  const [admOpen, setAdmOpen]   = useState(true);
  const [nurOpen, setNurOpen]   = useState(true);

  /* Per sub-branch collapsed state */
  const [specOpen, setSpecOpen]   = useState(true);
  const [phOpen, setPhOpen]       = useState(true);
  const [hrOpen, setHrOpen]       = useState(true);
  const [staffOpen, setStaffOpen] = useState(true);

  const expandAll = () => {
    setMdOpen(true); setChapOpen(true); setAdmOpen(true); setNurOpen(true);
    setSpecOpen(true); setPhOpen(true); setHrOpen(true); setStaffOpen(true);
  };
  const collapseAll = () => {
    setMdOpen(false); setChapOpen(false); setAdmOpen(false); setNurOpen(false);
    setSpecOpen(false); setPhOpen(false); setHrOpen(false); setStaffOpen(false);
  };

  const zooms = [0.6, 0.75, 0.85, 1.0];

  return (
    <div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={expandAll} style={{ padding: "6px 16px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 4, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
            Expand All
          </button>
          <button onClick={collapseAll} style={{ padding: "6px 16px", background: "transparent", color: "var(--primary)", border: "1.5px solid var(--primary)", borderRadius: 4, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
            Collapse All
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--text-light)", fontWeight: 600 }}>Zoom:</span>
          {zooms.map(z => (
            <button key={z} onClick={() => setZoom(z)} style={{
              padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
              borderRadius: 4, border: `1.5px solid ${zoom === z ? "var(--primary)" : "#C8D8CC"}`,
              background: zoom === z ? "var(--primary)" : "#fff",
              color: zoom === z ? "#fff" : "var(--text-mid)",
            }}>{Math.round(z * 100)}%</button>
          ))}
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {[
          { label: "Governance",       sk: "gov"  as SK },
          { label: "Medical Director", sk: "md"   as SK },
          { label: "Chaplaincy",       sk: "chap" as SK },
          { label: "Administration",   sk: "adm"  as SK },
          { label: "Nursing",          sk: "nur"  as SK },
          { label: "Audit",            sk: "aud"  as SK },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: S[l.sk].bg, border: `1.5px solid ${S[l.sk].bd}`, borderRadius: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: S[l.sk].bd }} />
            <span style={{ fontSize: "0.66rem", fontWeight: 700, color: S[l.sk].tx, letterSpacing: "0.04em" }}>{l.label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "#f5f5f5", border: "1.5px solid #bbb", borderRadius: 4 }}>
          <span style={{ fontSize: "0.66rem", color: "#555" }}>Click <strong>+/−</strong> to expand/collapse</span>
        </div>
      </div>

      {/* ── Chart canvas ── */}
      <div style={{ overflowX: "auto", overflowY: "visible", paddingBottom: 24 }}>
        <div style={{
          transformOrigin: "top left",
          transform: `scale(${zoom})`,
          transition: "transform 0.2s ease",
          display: "inline-block",
          paddingBottom: Math.round((1 - zoom) * 700) + 20,
        }}>

          {/* TOP GOVERNANCE CHAIN — centred column */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <TopBox label="BISHOP OF GOASO DIOCESE" />
            <VLine h={14} />
            <TopBox label="DIOCESAN HEALTH SERVICE BOARD" />
            <VLine h={14} />
            <TopBox label="DIRECTOR OF HEALTH SERVICE" />
            <VLine h={14} />

            {/* HORIZONTAL SPINE + DEPT COLUMNS */}
            <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>

              {/* Spine line */}
              <div style={{ position: "absolute", top: 0, left: "4%", right: "4%", height: 1.5, background: "#444" }} />

              {/* ══════ COL 1 — MEDICAL DIRECTOR ══════ */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 5px" }}>
                <VLine h={14} color="#C8960C" />
                <DeptBox label="MEDICAL DIRECTOR" sk="md" hasChildren onToggle={() => setMdOpen(o => !o)} collapsed={!mdOpen} />

                {mdOpen && (
                  <>
                    <VLine h={18} color="#C8960C" />
                    {/* Two sub-branches side by side */}
                    <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "#C8960C" }} />

                      {/* Specialist branch */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 4px" }}>
                        <VLine h={12} color="#C8960C" />
                        <SubBox label="SPECIALIST CLINICAL COORDINATOR" sk="md" width={90} />
                        {/* Toggle badge on sub */}
                        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                          <div
                            onClick={() => setSpecOpen(o => !o)}
                            style={{
                              width: 14, height: 14, borderRadius: "50%",
                              background: "#C8960C", color: "#fff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 10, fontWeight: 900, cursor: "pointer",
                              border: "1.5px solid #fff", margin: "3px auto",
                              userSelect: "none",
                            }}
                          >{specOpen ? "−" : "+"}</div>
                          {specOpen && (
                            <LeafStack sk="subMd" width={90} items={[
                              "MEDICAL OFFICER", "HOUSE OFFICER", "PHARMACY",
                              "DIAGNOSTICS", "ANAESTHESIA", "PHYSIOTHERAPY",
                              "MEDICAL RECORDS", "PHYSICIAN ASSISTANT",
                            ]} />
                          )}
                        </div>
                      </div>

                      {/* Public Health branch */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 4px" }}>
                        <VLine h={12} color="#C8960C" />
                        <SubBox label="PUBLIC HEALTH" sk="md" width={80} />
                        <div
                          onClick={() => setPhOpen(o => !o)}
                          style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: "#C8960C", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontWeight: 900, cursor: "pointer",
                            border: "1.5px solid #fff", margin: "3px auto",
                            userSelect: "none",
                          }}
                        >{phOpen ? "−" : "+"}</div>
                        {phOpen && (
                          <LeafStack sk="subMd" width={80} items={[
                            "NUTRITION", "OUT-DOOR CLINICS", "SURGICAL CLINICS",
                          ]} />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ══════ COL 2 — CHAPLAIN ══════ */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 6px" }}>
                <VLine h={14} color="#E65100" />
                <DeptBox label="CHAPLAIN" sk="chap" hasChildren onToggle={() => setChapOpen(o => !o)} collapsed={!chapOpen} />
                {chapOpen && (
                  <>
                    <VLine h={18} color="#E65100" />
                    <SubBox label="PASTORAL CARE" sk="chap" width={84} />
                  </>
                )}
              </div>

              {/* ══════ COL 3 — ADMINISTRATOR ══════ */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 6px" }}>
                <VLine h={14} color="#1565C0" />
                <DeptBox label="ADMINISTRATOR" sk="adm" hasChildren onToggle={() => setAdmOpen(o => !o)} collapsed={!admOpen} />

                {admOpen && (
                  <>
                    <VLine h={18} color="#1565C0" />
                    <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.5, background: "#1565C0" }} />

                      {/* HR Manager branch */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 4px" }}>
                        <VLine h={12} color="#1565C0" />
                        <SubBox label="HR MANAGER" sk="adm" width={82} />
                        <div
                          onClick={() => setHrOpen(o => !o)}
                          style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: "#1565C0", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontWeight: 900, cursor: "pointer",
                            border: "1.5px solid #fff", margin: "3px auto",
                            userSelect: "none",
                          }}
                        >{hrOpen ? "−" : "+"}</div>
                        {hrOpen && <LeafBox label="ACCOUNTS / CLAIMS" sk="adm" width={82} />}
                      </div>

                      {/* Admin Staff branch */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 4px" }}>
                        <VLine h={12} color="#1565C0" />
                        <SubBox label="ADMIN STAFF" sk="adm" width={82} />
                        <div
                          onClick={() => setStaffOpen(o => !o)}
                          style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: "#1565C0", color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontWeight: 900, cursor: "pointer",
                            border: "1.5px solid #fff", margin: "3px auto",
                            userSelect: "none",
                          }}
                        >{staffOpen ? "−" : "+"}</div>
                        {staffOpen && (
                          <LeafStack sk="subAdm" width={82} items={[
                            "TRANSPORT", "PLANTS & GROUNDS", "ESTATES & MAINTENANCE",
                            "SEWING UNIT", "SECURITY", "MORTUARY", "I.C.T", "LAUNDRY",
                            "ENVIRONMENTAL HEALTH", "PROCUREMENT", "CATERING",
                            "OTHER SUPPORTING STAFF",
                          ]} />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ══════ COL 4 — NURSE MANAGER ══════ */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 6px" }}>
                <VLine h={14} color="#2E7D32" />
                <DeptBox label="NURSE MANAGER" sk="nur" hasChildren onToggle={() => setNurOpen(o => !o)} collapsed={!nurOpen} />
                {nurOpen && (
                  <>
                    <VLine h={18} color="#2E7D32" />
                    <LeafStack sk="subNur" width={90} items={[
                      "NURSE SPECIALIST", "NURSES", "MIDWIVES",
                      "NURSE ASSISTANTS", "WARD ASSISTANTS",
                    ]} />
                  </>
                )}
              </div>

              {/* ══════ COL 5 — INTERNAL AUDITOR ══════ */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 6px" }}>
                <VLine h={14} color="#6A1B9A" />
                <DeptBox label="INTERNAL AUDITOR" sk="aud" />
              </div>

            </div>{/* end dept row */}
          </div>{/* end top chain */}
        </div>
      </div>
    </div>
  );
}
