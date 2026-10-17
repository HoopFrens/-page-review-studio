import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), "public/brand/page-review-studio-logo.png"));
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "white" }}>
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={240} height={240 * 772 / 2578} alt="" />
    </div>,
    size,
  );
}
