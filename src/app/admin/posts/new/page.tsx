"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const POST_TYPES = ["news", "blog", "event", "announcement"];

export default function NewPostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("news");
  const [status, setStatus] = useState("draft");
  const [author, setAuthor] = useState("Admin User");

  // File state tracking
  const [featuredImageId, setImgId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploading] = useState(false);

  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const slugify = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // Triggered when clicking the image box container
  const triggerFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handles uploading the actual file binary directly to WordPress
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview URL instantly for the UI
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    showToast("Uploading image to media library...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Using WP REST API via a custom endpoint proxy or direct to WP if configured
      // Note: WordPress requires proper Auth headers which we manage on the server side
      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed uploading file to WordPress");
      }

      // Store the true WordPress Database ID of the created Media item
      setImgId(result.id);
      showToast("Image successfully uploaded to WordPress!");
    } catch (err: any) {
      showToast(`Upload Error: ${err.message || "Could not save media file"}`);
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const save = async (publish?: boolean) => {
    if (!title.trim()) {
      showToast("Please enter a title");
      return;
    }

    const targetStatus = publish ? "published" : status;
    setSaving(true);

    try {
      const response = await fetch("/api/auth/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: body.trim(),
          status: targetStatus,
          type: type,
          featuredImageId: featuredImageId, // 👈 Passing real attachment ID here
        }),
      });

      const result = await response.json();
      setSaving(false);

      if (!response.ok) {
        showToast(`Error: ${result.error || "Could not execute mutation"}`);
        return;
      }

      showToast(
        publish || targetStatus === "published"
          ? "Post published via WPGraphQL mutation!"
          : "Draft updated in WordPress database",
      );
      setTimeout(() => router.push("/admin/posts"), 1500);
    } catch (err) {
      setSaving(false);
      showToast("A network issue occurred running the GraphQL operation.");
    }
  };

  return (
    <>
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Topbar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "0.5px solid #e5e7eb",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#111" }}>
            New Post
          </div>
          {title && (
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>
              /{slugify(title)}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => save(false)}
            disabled={saving || uploadingImage}
            style={{
              padding: "7px 14px",
              border: "0.5px solid #d1d5db",
              borderRadius: 6,
              fontSize: 13,
              background: "#fff",
              color: "#555",
              cursor: "pointer",
              opacity: uploadingImage ? 0.5 : 1,
            }}
          >
            💾 Save draft
          </button>
          <button
            onClick={() => save(true)}
            disabled={saving || uploadingImage}
            style={{
              padding: "7px 14px",
              background: "#0A4F3C",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              opacity: uploadingImage ? 0.5 : 1,
            }}
          >
            {saving ? "Processing Mutation…" : "Publish to WP →"}
          </button>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}
        >
          {/* Main editor area */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title…"
                style={{
                  width: "100%",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#111",
                  border: "none",
                  borderBottom: "1.5px solid #e5e7eb",
                  padding: "8px 0",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short excerpt or summary shown on listing page…"
                style={{
                  width: "100%",
                  fontSize: 13,
                  color: "#555",
                  border: "0.5px solid #e5e7eb",
                  borderRadius: 6,
                  padding: "8px 10px",
                  background: "#fff",
                  outline: "none",
                }}
              />
            </div>

            {/* Rich Editor Toolbar Mock */}
            <div
              style={{
                display: "flex",
                gap: 2,
                padding: "6px 8px",
                border: "0.5px solid #e5e7eb",
                borderBottom: "none",
                borderRadius: "6px 6px 0 0",
                background: "#F9FAFB",
                flexWrap: "wrap",
              }}
            >
              {[
                ["B", "Bold"],
                ["I", "Italic"],
                ["U", "Underline"],
                ["H", "Heading"],
                ["•", "List"],
                ["1.", "Ordered"],
                ["🔗", "Link"],
                ["📷", "Image"],
              ].map(([icon, title]) => (
                <button
                  key={icon}
                  title={title}
                  style={{
                    padding: "4px 8px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                    fontSize: 13,
                    borderRadius: 4,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#E5E7EB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  {icon}
                </button>
              ))}
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={
                "Write your post content here…\n\nSupports raw HTML formatting tags or block strings out of the box."
              }
              style={{
                width: "100%",
                minHeight: 320,
                fontSize: 14,
                color: "#333",
                border: "0.5px solid #e5e7eb",
                borderRadius: "0 0 6px 6px",
                padding: "12px",
                background: "#fff",
                resize: "vertical",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.7,
                outline: "none",
              }}
            />
          </div>

          {/* Configuration Sidebar */}
          <div>
            {/* Post parameters */}
            <div
              style={{
                background: "#fff",
                border: "0.5px solid #e5e7eb",
                borderRadius: 10,
                padding: 14,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 12,
                }}
              >
                Post settings
              </div>
              {[
                {
                  label: "Type",
                  el: (
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      style={selStyle}
                    >
                      {POST_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  ),
                },
                {
                  label: "Status",
                  el: (
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      style={selStyle}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  ),
                },
                {
                  label: "Author",
                  el: (
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      style={inputStyle}
                    />
                  ),
                },
                {
                  label: "Publish date",
                  el: (
                    <input
                      type="date"
                      style={inputStyle}
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  ),
                },
              ].map((row) => (
                <div key={row.label} style={{ marginBottom: 10 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: "#888",
                      fontWeight: 500,
                      display: "block",
                      marginBottom: 3,
                    }}
                  >
                    {row.label}
                  </label>
                  {row.el}
                </div>
              ))}
            </div>

            {/* Content Optimization SEO block */}
            <div
              style={{
                background: "#fff",
                border: "0.5px solid #e5e7eb",
                borderRadius: 10,
                padding: 14,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 12,
                }}
              >
                SEO &amp; Slug
              </div>
              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: "#888",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 3,
                  }}
                >
                  URL slug
                </label>
                <input
                  value={slugify(title)}
                  readOnly
                  style={{
                    ...inputStyle,
                    background: "#F9FAFB",
                    color: "#888",
                  }}
                  placeholder="auto-generated"
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: 12,
                    color: "#888",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 3,
                  }}
                >
                  Meta description
                </label>
                <textarea
                  placeholder="Optional SEO description…"
                  style={
                    {
                      ...inputStyle,
                      minHeight: 60,
                      resize: "vertical",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>

            {/* Media dropzone container */}
            <div
              style={{
                background: "#fff",
                border: "0.5px solid #e5e7eb",
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 12,
                }}
              >
                Featured image
              </div>
              <div
                onClick={triggerFileSelector}
                style={{
                  border: previewUrl
                    ? "1.5px solid #0A4F3C"
                    : "1px dashed #d1d5db",
                  borderRadius: 6,
                  padding: previewUrl ? "8px" : "24px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                  color: previewUrl ? "#0A4F3C" : "#bbb",
                  fontSize: 13,
                  background: previewUrl ? "#E8F5F0" : "transparent",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {previewUrl ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "130px",
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    {uploadingImage && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(255,255,255,0.75)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "700",
                        }}
                      >
                        UPLOADING...
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>📷</div>
                    {uploadingImage
                      ? "Processing File..."
                      : "Click to select image"}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            background: "#0A4F3C",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            fontSize: 13,
            zIndex: 999,
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 13,
  border: "0.5px solid #e5e7eb",
  borderRadius: 5,
  padding: "6px 8px",
  background: "#fff",
  color: "#111",
  outline: "none",
  fontFamily: "var(--font-sans)",
};
const selStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };
