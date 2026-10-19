import type { VisibilityGuide } from "@/lib/visibility-content";
export const citationOriginalGuide: VisibilityGuide = {
  "slug": "research-citation-export-endpoint",
  "lead": "A citation exporter must preserve the publication's real identity and review status. NexisHub already implements JSON, BibTeX and APA-style output, but the current code has format-specific limitations that should be tested rather than concealed.",
  "overview": [
    "The actual source contains `src/lib/nri-publication-registry.ts` and `src/app/research/publications/[slug]/citation/route.ts`. The registry currently records the AI Visibility Index working paper version 0.1 as Pre-Review, with `doi: null`, no validated organization rankings and no pilot data.",
    "The citation route looks up a known slug, returns 404 if the record is absent and accepts a `format` query parameter. Default is JSON; `bibtex` produces downloadable BibTeX; `apa` produces an APA-style plain-text citation. These behaviors were verified in source, not certified against citation standards."
  ],
  "deepDive": [
    {
      "title": "One publication record supplies every export",
      "paragraphs": [
        "The NexisHub record contains slug, title, subtitle, document type, version, publication date, author names, canonical path, review level, DOI, licence and data availability. These fields define what an export is allowed to claim. A missing DOI must remain missing, and the label Pre-Review must not be silently upgraded to a peer-reviewed publication.",
        "For an unknown slug, the route explicitly returns HTTP 404 with `Publication not found`. JSON returns the full record using `Content-Disposition` with a `.json` filename; the other two branches set their respective content types and download filenames. This consistency of source is useful even before additional citation formats are implemented."
      ]
    },
    {
      "title": "A real BibTeX formatting weakness",
      "paragraphs": [
        "In the inspected handler, the author list is built with `publication.authors.join(', ')`, then inserted into the BibTeX `author` field. Bibliography processors normally expect appropriately separated author names, so the output deserves parser-based tests rather than an assertion of perfect interoperability.",
        "The entry key is constructed from the publication slug and version with one dot removed. Metadata is interpolated into braces without comprehensive escaping. Test multiple authors, Unicode, braces, backslashes, punctuation and version strings before relying on it in a production research workflow. Do not treat a visible downloaded file as proof that citation software can parse its meaning correctly."
      ]
    },
    {
      "title": "The APA-style string is not an official formatter",
      "paragraphs": [
        "The handler assembles an author string, year, title, version, document type, institution and canonical URL. This provides a convenient citation starting point. It does not implement every APA style requirement for surname initials, italics, capitalization or author-count rules, so users should see it as APA-style output pending formal format validation.",
        "The source currently hardcodes the canonical `https://nexishub.vercel.app` hostname. That is the reviewed site address, but exporters should eventually draw the public canonical host from a controlled configuration, not from a Preview deployment URL. A durable citation must keep the intended version identifiable even when the website or framework changes."
      ]
    },
    {
      "title": "A test plan that could be automated today",
      "paragraphs": [
        "Use fixture publications to test a known slug and an unknown slug; default JSON, explicit BibTeX, explicit APA-style text, and unexpected format values; exact content type and Content-Disposition headers; correct original author order and publication year; non-ASCII names; and a version without a DOI.",
        "The route currently falls back to JSON when `format` is an unrecognized string. Whether to preserve or reject that behavior is an API design decision to document before clients depend on it. Retain the original response in contract tests and make breaking changes through an explicit versioned plan."
      ]
    }
  ],
  "principles": [
    {
      "title": "Never invent identifiers",
      "detail": "Do not create DOIs or peer-review claims when the publication record does not support them."
    },
    {
      "title": "One authoritative metadata record",
      "detail": "Export and visible paper must agree on authors, status, version and URL."
    },
    {
      "title": "Test actual citation syntax",
      "detail": "Download success and valid bibliographic meaning are separate acceptance criteria."
    }
  ],
  "workflow": [
    {
      "title": "Validate the registry",
      "detail": "Check title, authors, date, version and publication review status."
    },
    {
      "title": "Implement supported formats",
      "detail": "Serialize JSON, BibTeX and APA-style text from the same record."
    },
    {
      "title": "Test unknown and malformed inputs",
      "detail": "Confirm intentional status codes and safe download headers."
    },
    {
      "title": "Exercise citation parsers",
      "detail": "Check author separation and special-character escaping with fixtures."
    }
  ],
  "pitfalls": [
    {
      "title": "Inventing a DOI",
      "detail": "The AI Visibility Index registry explicitly has no DOI."
    },
    {
      "title": "Assuming APA compliance",
      "detail": "The current branch creates a plain-text APA-style approximation."
    },
    {
      "title": "Ignoring immutable versions",
      "detail": "A cited working paper should remain identifiable after updates."
    }
  ],
  "measurement": [
    "Record format parsing success, invalid-input status, metadata parity and version-specific export correctness.",
    "Review the endpoint's actual HTTP behavior before claiming a live citation download is functional."
  ],
  "future": "Add structured CSL exports, tested bibliographic formatting and stable versioned snapshots only after current contracts are measured.",
  "takeaways": [
    "The repository already contains a real citation route.",
    "Its AI Visibility Index paper is pre-review, with DOI absent.",
    "The current BibTeX and APA formats require detailed validation.",
    "Never advertise unsupported academic status."
  ],
  "faq": [
    {
      "question": "Does NexisHub's paper have a DOI?",
      "answer": "No. The inspected version 0.1 record explicitly sets DOI to null."
    },
    {
      "question": "Are the current APA exports certified?",
      "answer": "No. The route creates an APA-style string rather than a complete formal style engine."
    }
  ],
  "references": [
    {
      "label": "NexisHub AI Visibility Index working paper",
      "url": "https://nexishub.vercel.app/research/ai-visibility-index"
    },
    {
      "label": "Crossref DOI guidelines",
      "url": "https://www.crossref.org/display-guidelines/"
    },
    {
      "label": "BibTeX documentation",
      "url": "https://ctan.org/pkg/bibtex"
    }
  ]
};
