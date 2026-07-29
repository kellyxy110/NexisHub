import { NextResponse } from "next/server";
import { publicationBySlug } from "@/lib/nri-publication-registry";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const publication = publicationBySlug.get((await params).slug);
  if (!publication) return NextResponse.json({ error: "Publication not found" }, { status: 404 });
  const url = new URL(request.url);
  const format = url.searchParams.get("format") ?? "json";
  const author = publication.authors.join(", ");
  if (format === "bibtex") {
    const bibtex = `@techreport{nri-${publication.slug}-${publication.version.replace(".", "")},\n  title = {${publication.title}},\n  author = {${author}},\n  institution = {Nexis Research Institute},\n  year = {${publication.datePublished.slice(0, 4)}},\n  type = {${publication.type}},\n  version = {${publication.version}},\n  url = {https://nexishub.vercel.app${publication.canonicalPath}}\n}`;
    return new NextResponse(bibtex, { headers: { "Content-Type": "application/x-bibtex; charset=utf-8", "Content-Disposition": `attachment; filename="${publication.slug}.bib"` } });
  }
  if (format === "apa") {
    return new NextResponse(`${author} (${publication.datePublished.slice(0, 4)}). ${publication.title} (${publication.version}) [${publication.type}]. Nexis Research Institute. https://nexishub.vercel.app${publication.canonicalPath}`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${publication.slug}-apa.txt"` } });
  }
  return NextResponse.json(publication, { headers: { "Content-Disposition": `attachment; filename="${publication.slug}.json"` } });
}
