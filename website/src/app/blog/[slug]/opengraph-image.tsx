import { ImageResponse } from "next/og";
import { getPost, visibilityPosts } from "@/lib/posts";

export const alt = "NexisHub AI Visibility field guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return visibilityPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const hue = Math.abs([...slug].reduce((sum, character) => sum + character.charCodeAt(0), 0)) % 80 + 215;
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", color: "white", background: `linear-gradient(135deg, hsl(${hue} 72% 15%), #10131c 58%, hsl(${hue + 45} 78% 28%))`, fontFamily: "Arial" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#aeb8ff" }}><span style={{ width: 14, height: 14, borderRadius: 99, background: "#6f83ff" }} />NexisHub · AI Visibility</div>
    <div style={{ display: "flex", maxWidth: 1040, fontSize: 62, lineHeight: 1.02, letterSpacing: -3, fontWeight: 700 }}>{post?.title ?? "AI Visibility & Machine Discovery"}</div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#adb2c2" }}><span>Evidence · Clarity · Craft</span><span>nexishub.vercel.app/blog</span></div>
  </div>, size);
}
