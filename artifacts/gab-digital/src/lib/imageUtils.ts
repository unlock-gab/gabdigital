/**
 * Browser-side image compression using Canvas API.
 * No external library needed.
 *
 * - Accepts any image File (PNG, JPG, WEBP, etc.)
 * - Resizes to maxSizePx in the longest dimension
 * - Re-encodes as JPEG at specified quality
 * - Returns a base64 data URL ready for localStorage storage
 */
export async function compressImage(
  file: File,
  maxSizePx = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Downscale only if needed — never upscale
        if (width > maxSizePx || height > maxSizePx) {
          const ratio = Math.min(maxSizePx / width, maxSizePx / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }

        // White background for PNGs with transparency
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Output as JPEG (best size/quality ratio)
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/** Returns a human-readable file size string */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
