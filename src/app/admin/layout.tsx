"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  {
    section: "Overview",
    items: [{ href: "/admin", icon: "🗂", label: "Dashboard" }],
  },
  {
    section: "Content",
    items: [
      { href: "/admin/posts", icon: "📰", label: "News & Blogs", badge: 3 },
      { href: "/admin/posts/new", icon: "✏️", label: "New Post" },
    ],
  },
  {
    section: "Appointments",
    items: [
      { href: "/admin/bookings", icon: "📅", label: "All Bookings", badge: 5 },
      { href: "/admin/calendar", icon: "🗓", label: "Calendar View" },
    ],
  },
  {
    section: "Settings",
    items: [{ href: "/admin/settings", icon: "⚙️", label: "Settings" }],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { admin, loading, logout } = useAuth();

  /* Login page — render with NO sidebar/shell */
  const isLoginPage = pathname === "/admin/login";
  if (isLoginPage) return <>{children}</>;

  /* Auth guard — show blank while redirecting */
  if (loading || !admin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#063328",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid rgba(255,255,255,0.2)",
            borderTopColor: "#E8B84B",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "210px 1fr",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        style={{
          background: "#fff",
          borderRight: "0.5px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "16px",
            borderBottom: "0.5px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
        <img src="/images/logo.svg" alt="Logo" style={{ width: 36, height: 36 }} />
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.2,
              }}
            >
              SECH Admin
            </div>
            <div style={{ fontSize: 10.5, color: "#aaa" }}>Hospital Portal</div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ padding: "8px 0", flex: 1 }}>
          {NAV.map((group) => (
            <div key={group.section}>
              <div
                style={{
                  padding: "10px 14px 3px",
                  fontSize: 10,
                  color: "#bbb",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              >
                {group.section}
              </div>
              {group.items.map((item) => {
                /* Active: exact match OR child route (but not /admin/posts/new being active for /admin/posts) */
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href ||
                      (pathname.startsWith(item.href + "/") &&
                        item.href !== "/admin/posts/new");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "8px 14px 8px 12px",
                      fontSize: 13,
                      color: active ? "#0A4F3C" : "#555",
                      background: active ? "#F0F7F4" : "transparent",
                      borderLeft: `2px solid ${active ? "#0A4F3C" : "transparent"}`,
                      fontWeight: active ? 600 : 400,
                      textDecoration: "none",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background =
                          "#F9FAFB";
                        (e.currentTarget as HTMLElement).style.color = "#111";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#555";
                      }
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        width: 18,
                        textAlign: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {"badge" in item && item.badge ? (
                      <span
                        style={{
                          background: "#FEE2E2",
                          color: "#DC2626",
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "1px 7px",
                          borderRadius: 20,
                          flexShrink: 0,
                        }}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div
          style={{
            height: "0.5px",
            background: "#f3f4f6",
            margin: "0 14px",
            flexShrink: 0,
          }}
        />

        {/* Back to site link */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "10px 14px",
            fontSize: 12,
            color: "#888",
            textDecoration: "none",
            transition: "color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0A4F3C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
        >
          <span style={{ fontSize: 14 }}>←</span> Back to website
        </Link>

        {/* User card + logout */}
        <div
          style={{
            padding: "12px 14px",
            borderTop: "0.5px solid #e5e7eb",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#0A4F3C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#E8B84B",
                flexShrink: 0,
              }}
            >
              {admin.avatar}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#111",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {admin.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#aaa",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {admin.role}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "7px",
              border: "0.5px solid #e5e7eb",
              borderRadius: 6,
              background: "#fff",
              fontSize: 12,
              color: "#DC2626",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontWeight: 600,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#FEF2F2";
              (e.currentTarget as HTMLElement).style.borderColor = "#FCA5A5";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
            }}
          >
            🚪 Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div
        style={{ background: "#F7F9F7", overflowY: "auto", minHeight: "100vh" }}
      >
        {children}
      </div>
    </div>
  );
}
