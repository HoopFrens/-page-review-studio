import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { logoGeometry } from "@/lib/brand";

export const alt = "Page Review Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/page-review-studio-logo.png"));
  const geometry = logoGeometry(1040);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "white" }}>
      <div style={{ display: "flex", position: "relative", width: 1040, height: geometry.height, overflow: "hidden" }}>
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={geometry.imageWidth}
          height={geometry.imageHeight}
          style={{ position: "absolute", left: geometry.left, top: geometry.top }}
          alt=""
        />
      </div>
    </div>,
    size,
  );
}
