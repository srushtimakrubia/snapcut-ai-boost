import { createServerFn } from "@tanstack/react-start";

interface Input {
  imageBase64: string; // data URL (data:image/png;base64,...)
  filename: string;
}

/**
 * Removes the background from an uploaded image using remove.bg.
 * Requires the REMOVE_BG_API_KEY environment secret to be set.
 */
export const removeBackground = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): Input => {
    const i = input as Input;
    if (!i?.imageBase64 || typeof i.imageBase64 !== "string") {
      throw new Error("imageBase64 is required");
    }
    if (!i.imageBase64.startsWith("data:image/")) {
      throw new Error("imageBase64 must be a data URL");
    }
    if (i.imageBase64.length > 15_000_000) {
      throw new Error("Image is too large (max ~10MB)");
    }
    return { imageBase64: i.imageBase64, filename: i.filename ?? "image.png" };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Background removal isn't configured yet. Add REMOVE_BG_API_KEY in project secrets to enable it.",
      );
    }

    // Strip data URL prefix -> base64 payload
    const base64 = data.imageBase64.split(",")[1] ?? "";

    const form = new FormData();
    form.append("image_file_b64", base64);
    form.append("size", "auto");
    form.append("format", "png");

    const res = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Background removal failed [${res.status}]: ${text.slice(0, 200)}`);
    }

    const buf = new Uint8Array(await res.arrayBuffer());
    // Convert to base64 for transport back to the client
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < buf.length; i += chunk) {
      binary += String.fromCharCode(...buf.subarray(i, i + chunk));
    }
    const outBase64 = btoa(binary);
    return {
      pngDataUrl: `data:image/png;base64,${outBase64}`,
      filename: data.filename.replace(/\.[^.]+$/, "") + "-nobg.png",
    };
  });
