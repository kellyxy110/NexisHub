# Role and Permission Matrix

**Status:** Proposed. No reviewer or Studio personnel are assigned by this document.

| Role | Public content | Drafts | Reviews | Pilot/consent | Studio operations | Governance |
|---|---:|---:|---:|---:|---:|---:|
| SUPER_ADMIN | Read/write | Full | Full | Full, when separately enabled | Full, when separately enabled | Full |
| NRI_DIRECTOR | Read | Approve | Adjudicate | Manage, when enabled | None | NRI governance |
| RESEARCH_LEAD | Read | Create/edit | Submit/adjudicate | Manage, when enabled | None | Research workflow |
| EDITOR | Read | Edit | Coordinate | None | None | Editorial |
| AUTHOR | Read | Own drafts | Respond | None | None | None |
| TECHNICAL_REVIEWER | Read | No | Assigned reviews | None | None | Review only |
| METHODOLOGY_REVIEWER | Read | No | Assigned reviews | None | None | Review only |
| ETHICS_REVIEWER | Read | No | Assigned reviews | Consent review only | None | Ethics only |
| STUDIO_DIRECTOR | Read | None | None | None | Studio operations | Studio governance |
| STUDIO_OPERATIONS | Read | None | None | None | Delivery operations | None |
| VIEWER | Public only | No | No | No | No | No |

Server-side authorization must enforce this matrix. UI visibility is never an authorization control.
