import { ImageResponse } from "next/og";

export const alt = "NexisHub — Intelligent software, one ecosystem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#090a0c", color: "white", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 600 }}><div style={{ width: 42, height: 42, borderRadius: 12, background: "white", color: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>N</div>NexisHub</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ maxWidth: 1000, display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 600, letterSpacing: "-4px", lineHeight: 1 }}><span>Intelligent software.</span><span>One connected ecosystem.</span></div><div style={{ marginTop: 28, display: "flex", color: "#7faeff", fontSize: 22 }}>Intelligence · Connection · Creation</div></div></div>, size);
}
