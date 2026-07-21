import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useRef, useState } from "react";

import { removeBackground } from "@/lib/remove-bg.functions";
import { BeforeAfter } from "./BeforeAfter";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(file);
  });
}

export function UploadWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const remove = useServerFn(removeBackground);

  const mutation = useMutation({
    mutationFn: async (f: File) => {
      const dataUrl = await readAsDataUrl(f);
      return remove({ data: { imageBase64: dataUrl, filename: f.name } });
    },
  });

  const onFile = useCallback((f: File | null) => {
    setError(null);
    mutation.reset();
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("Max file size is 10MB.");
      return;
    }
    setFile(f);
    readAsDataUrl(f).then(setPreview);
    mutation.mutate(f);
  }, [mutation]);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    mutation.reset();
    if (inputRef.current) inputRef.current.value = "";
  };

  const download = () => {
    const result = mutation.data;
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.pngDataUrl;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (preview && mutation.data) {
    return (
      <div className="space-y-4">
        <BeforeAfter before={preview} after={mutation.data.pngDataUrl} />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={download}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:opacity-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download transparent PNG
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-input bg-surface px-6 py-3.5 font-semibold text-foreground transition hover:bg-surface-muted"
          >
            Try another image
          </button>
        </div>
      </div>
    );
  }

  if (preview && mutation.isPending) {
    return (
      <div className="relative rounded-2xl border overflow-hidden bg-checker aspect-[4/3]">
        <img src={preview} alt="" className="absolute inset-0 w-full h-full object-contain opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
          <p className="mt-4 font-medium text-foreground">Removing background…</p>
          <p className="text-sm text-muted-foreground">Usually takes under 5 seconds</p>
        </div>
      </div>
    );
  }

  const shownError = error ?? (mutation.isError ? (mutation.error as Error).message : null);

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onFile(e.dataTransfer.files?.[0] ?? null);
        }}
        className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition
          ${dragging ? "border-secondary bg-secondary/5" : "border-secondary/50 bg-surface hover:border-secondary hover:bg-surface-muted"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4 transition group-hover:scale-105">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p className="text-lg font-semibold font-display text-foreground">
          Drop your image here or <span className="text-gradient-primary">browse</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">JPG, PNG, or WEBP · up to 10MB</p>
        <p className="mt-4 text-xs text-muted-foreground">
          By uploading you agree to our terms. Images are processed securely and not stored.
        </p>
      </label>
      {shownError && (
        <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {shownError}
        </div>
      )}
      {file && !mutation.isPending && !mutation.data && !mutation.isError && (
        <p className="mt-3 text-sm text-muted-foreground">Selected: {file.name}</p>
      )}
    </div>
  );
}
