import Link from "next/link";


export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", background: "var(--off-white)" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
       <div className="relative mb-8">
           <div className="text-[150px] lg:text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
             
            </div>
          </div>
          
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 800, color: "var(--text-dark)", margin: "0 0 12px" }}>
          Page Not Found
        </h1>
        <p style={{ color: "var(--text-light)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Sorry, we couldn't find the page you were looking for. It may have been moved or may not exist.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
