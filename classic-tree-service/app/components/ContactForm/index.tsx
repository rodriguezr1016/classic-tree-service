"use client";

import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";


export default function ContactWithUploadForm() {
  const { edgestore } = useEdgeStore();

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [jobType, setJobType] = React.useState("Tree Trimming")

  type PickedImage = {
  file: File;
  previewUrl: string;
};

const [files, setFiles] = React.useState<PickedImage[]>([]);

  const [progress, setProgress] = React.useState<Record<string, number>>({});

  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = React.useState("");

  // honeypot (anti-bot)
  const [companyWebsite, setCompanyWebsite] = React.useState("");

  function onPickFiles(list: FileList | null) {
  if (!list) return;

  const picked = Array.from(list)
    .filter((f) => f.type.startsWith("image/"))
    .slice(0, 10);

  const withPreviews = picked.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
  }));

  setFiles((prev) => {
    const merged = [...prev, ...withPreviews];
    return merged.slice(0, 10);
  });
}


  function removeFile(index: number) {
  setFiles((prev) => {
    const copy = [...prev];
    const removed = copy.splice(index, 1)[0];
    if (removed) {
      URL.revokeObjectURL(removed.previewUrl);
      setProgress((p) => {
        const next = { ...p };
        delete next[removed.file.name];
        return next;
      });
    }
    return copy;
  });
}
React.useEffect(() => {
  return () => {
    files.forEach((x) => URL.revokeObjectURL(x.previewUrl));
  };
}, [files]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      // 1) Upload ALL selected images (if any)
      let imageUrls: string[] = [];

      if (files.length > 0) {
        const results = await Promise.all(
  files.map(async ({ file }) => {
    const res = await edgestore.publicFiles.upload({
      file,
      onProgressChange: (p) =>
        setProgress((prev) => ({ ...prev, [file.name]: p })),
    });
    return res.url;
  })
);


        imageUrls = results;
      }

      // 2) Save lead + imageUrls to MongoDB
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          jobType,
          imageUrls,
          companyWebsite, // honeypot
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong.");
        return;
      }

      // Success: reset form
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setJobType("")
      setFiles([]);
      setProgress({});
      setCompanyWebsite("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Network/server error.");
    }
  }

  const canSubmit = status !== "submitting" && name.trim().length > 0 && (phone.trim() || email.trim());

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 560, display: "grid", gap: 12 }}>
      <h2 style={{textAlign: 'start'}}>Request a Quote</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name *"
        required
      />
      <div style={{display: 'flex'}}>
        <input style={{flexGrow: 1}} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <input style={{flexGrow: 1}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>
      <label style={{textAlign:'start'}}>Job Type:</label>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}id="cars" name="cars">
        <option value="Tree Trimming">Tree Trimming</option>
        <option value="Tree Removal">Tree Removal</option>
        <option value="Stump Removal">Stump Removal</option>
        </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (optional)"
        rows={4}
      />

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: 12 }}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
          Photos (optional) — you can select multiple
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            onPickFiles(e.target.files);
            e.currentTarget.value = ""; // allow re-picking same file later
          }}
        />

        {files.length > 0 && (
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 13 }}>
            {files.map((item, i) => (
  <div
    key={`${item.file.name}-${i}`}
    style={{
      display: "grid",
      gridTemplateColumns: "72px 1fr auto",
      gap: 12,
      alignItems: "center",
      border: "1px solid #f0f0f0",
      borderRadius: 10,
      padding: 10,
    }}
  >
    <div
      style={{
        position: "relative",
        width: 72,
        height: 72,
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #eee",
        background: "#fafafa",
      }}
    >
      <Image
        src={item.previewUrl}
        alt={item.file.name}
        fill
        style={{ objectFit: "cover" }}
        unoptimized
      />
    </div>

    <div style={{ wordBreak: "break-word" }}>
      <div style={{ fontWeight: 600 }}>{item.file.name}</div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        {(item.file.size / 1024 / 1024).toFixed(2)} MB
        {progress[item.file.name] != null ? ` • ${progress[item.file.name]}%` : ""}
      </div>

      <div style={{ height: 8, background: "#eee", borderRadius: 999, overflow: "hidden", marginTop: 6 }}>
        <div
          style={{
            height: 8,
            width: `${progress[item.file.name] ?? 0}%`,
            background: "#4dabf7",
            transition: "width 120ms linear",
          }}
        />
      </div>
    </div>

    <button
      type="button"
      onClick={() => removeFile(i)}
      disabled={status === "submitting"}
      style={{
        border: "1px solid #ccc",
        borderRadius: 10,
        padding: "8px 10px",
        cursor: status === "submitting" ? "not-allowed" : "pointer",
      }}
    >
      Remove
    </button>
  </div>
))}

          </div>
        )}

        {files.length >= 10 && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#c92a2a" }}>
            Max 10 images.
          </div>
        )}
      </div>

      {/* honeypot */}
      <input
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      />

      <button type="submit" disabled={!canSubmit}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>

      {status === "success" && <p>Thanks! We’ll contact you soon.</p>}
      {status === "error" && <p style={{ color: "crimson" }}>{error}</p>}
      {!phone.trim() && !email.trim() && (
        <p style={{ fontSize: 12, opacity: 0.8 }}>Please enter a phone number or email.</p>
      )}
    </form>
  );
}
