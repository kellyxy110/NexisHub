import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "NexisHub", short_name: "NexisHub", description: "Intelligent software, one connected ecosystem.", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#111111", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
