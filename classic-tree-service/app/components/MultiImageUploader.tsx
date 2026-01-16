"use client";

import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";

type Props = {
  onUploadedUrlsChange?: (urls: string[]) => void;
};

export default function MultiImageUploader({ onUploadedUrlsChange }: Props) {
  const { edgestore } = useEdgeStore();
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = React.useState<string[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    onUploadedUrlsChange?.(uploadedUrls);
  }, [uploadedUrls, onUploadedUrlsChange]);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
      />

      <button
        type="button"
        disabled={isUploading || files.length === 0}
        onClick={async () => {
          setIsUploading(true);
          try {
            const results = await Promise.all(
              files.map((file) =>
                edgestore.publicFiles.upload({
                  file,
                })
              )
            );
            const urls = results.map((r) => r.url);
            setUploadedUrls(urls);
          } finally {
            setIsUploading(false);
          }
        }}
      >
        {isUploading ? "Uploading..." : "Upload images"}
      </button>

      {uploadedUrls.length > 0 && (
        <div style={{ fontSize: 12 }}>
          <strong>Uploaded:</strong>
          <ul>
            {uploadedUrls.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noreferrer">
                  {u}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
