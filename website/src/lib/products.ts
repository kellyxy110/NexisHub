export type Product = {
  name: string;
  eyebrow: string;
  description: string;
  accent: "blue" | "green" | "orange" | "purple" | "rose";
  status: "Live" | "In development";
  href: string | null;
  audience: string;
  flagship: boolean;
};

export const products: Product[] = [
  { name: "SiteNexis", eyebrow: "AI visibility intelligence", description: "Understand how your business appears across search engines and AI assistants, then see what to improve next.", accent: "blue", status: "Live", href: "/products/sitenexis", audience: "Businesses and growth teams", flagship: true },
  { name: "TeachNexis", eyebrow: "AI-powered education", description: "Tools designed to help teachers and schools create more effective learning experiences.", accent: "green", status: "Live", href: "https://teachnexis.vercel.app", audience: "Teachers and schools", flagship: false },
  { name: "LogicLand", eyebrow: "Interactive learning", description: "A place to learn coding, mathematics, logic, and problem solving by doing.", accent: "orange", status: "In development", href: "https://logicland.vercel.app", audience: "Students and future innovators", flagship: false },
  { name: "EventNexis", eyebrow: "Modern event operations", description: "Invitations, registration, QR check-in, and reporting in one connected workflow.", accent: "purple", status: "Live", href: "https://eventnexis.vercel.app", audience: "Event organizers and teams", flagship: false },
  { name: "CareBridge", eyebrow: "Connected care workflows", description: "Better communication and clearer workflows between healthcare providers and patients.", accent: "rose", status: "In development", href: "https://carebridge-io.vercel.app", audience: "Healthcare providers and patients", flagship: false },
  { name: "Pnyx", eyebrow: "Technology knowledge network", description: "Where technology conversations become organised knowledge.", accent: "purple", status: "Live", href: "https://pnyx-psi.vercel.app", audience: "Technology communities and knowledge workers", flagship: true },
];
