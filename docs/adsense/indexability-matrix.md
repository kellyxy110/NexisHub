# NexisHub Indexability Matrix

Audit date: 2026-09-25

| Route family | Intended class | Sitemap | Canonical | Robots | Status |
|---|---|---:|---|---|---|
| `/`, `/products`, `/products/*`, `/studio`, `/about`, `/blog`, `/contact` | Public indexable | Yes | Self | `index, follow` | PASS at HTTP/metadata level |
| `/blog/[slug]` | Public indexable editorial content | Yes | Self | `index, follow` | PASS at HTTP/metadata level; quality review pending |
| `/research`, `/research/ai-visibility-index`, `/research/roadmap`, `/research/publications` | Public research context | Yes | Self | `index, follow` | KEEP INDEXABLE; status and evidence review pending |
| `/research/search` | Interactive search utility | No after remediation | Self after remediation | `noindex, follow` after remediation | Bounded remediation implemented |
| `/legal/*` | Public trust/legal drafts | Yes | Self | `index, follow` | Owner/legal review required |
| `/admin/*` | Private administration | No | Protected/dynamic | Session-gated | Protected; not public inventory |
| `/api/*` | API | No | Not applicable | Robots disallow only | Must remain independently secured |
| Preview deployments | Preview/staging | Not assessed as production inventory | Must not become production canonical | Vercel/account setting review | Owner/Search Console verification required |

Google’s documentation distinguishes crawl control from index control. The search utility uses `noindex, follow` rather than robots blocking so crawlers can read the directive.
