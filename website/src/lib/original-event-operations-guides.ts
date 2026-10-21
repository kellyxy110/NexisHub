import type { VisibilityGuide } from "@/lib/visibility-content";

// Original worked examples for event technology. These do not imply deployed customer systems.
export const originalEventGuides: readonly VisibilityGuide[] = [
  {
    "slug": "reliable-event-registration-checkin",
    "lead": "An event admission system has to answer three questions reliably: who is expected, what access they purchased or received, and whether an entry has already been accepted. QR codes are merely one way of presenting a credential.",
    "overview": [
      "Consider an event whose registration desk has intermittent internet access. An attendee arrives with an invitation, but a second device already checked in the same code. The system must respond without creating a second admission, losing the original record, or turning volunteers into database administrators.",
      "This article is a proposed engineering design and worked example for event operations. It is not a claim that NexisHub has deployed this exact event system or processed real ticket sales."
    ],
    "deepDive": [
      {
        "title": "Worked example: one ticket scanned twice",
        "paragraphs": [
          "Suppose ticket EVT-042 belongs to a single-admission session. At 18:05, two check-in devices submit a scan nearly simultaneously. If the server simply reads `status=unused` and updates it afterward, both may receive an accepted response. The correct transition must be atomic: accept exactly one scan for that ticket and event, and return 'already admitted' for subsequent scans with the first acceptance time and an escalation option.",
          "A conceptual record has `ticket_id`, `event_id`, `attendee_id`, `eligibility_status`, `checkin_status`, `admitted_at`, `gate_id`, and a version or event ledger. Use a unique constraint or transactional compare-and-set operation for admission. A scan retry should carry an idempotency key so timeouts cannot produce contradictory responses. Do not store unnecessary identity documents simply to make gate operations convenient."
        ]
      },
      {
        "title": "Offline is a reconciliation problem",
        "paragraphs": [
          "At a venue with unreliable connectivity, a device may need a limited, signed roster and an expiry policy. Offline acceptance can reduce queues, but two disconnected gates can independently accept the same credential. The product must disclose that tradeoff and define the staff's response when devices reconcile.",
          "Design a sync log with device identity, monotonic local sequence, ticket reference, decision time, server receipt time and conflict outcome. Test clock drift, stolen devices, roster expiry, revoked tickets, duplicate scans, and a reconnect after hours offline. A QR image by itself solves none of these."
        ]
      },
      {
        "title": "Boundary between payment and admission",
        "paragraphs": [
          "Payments, refunds and attendance are separate domains. A webhook indicating payment completion may arrive late, be duplicated or fail signature verification. Only server-verified, authorized payment events should change ticket eligibility. An attendee should not become 'paid' because the frontend received a success URL.",
          "A refund issued after a ticket has been scanned presents a policy question, not merely a code branch. Define the permitted refund window, whether staff can reverse admission, and who reviews financial exceptions. Preserve the original payment event and the later decision as separate records."
        ]
      }
    ],
    "principles": [
      {
        "title": "Make check-in idempotent",
        "detail": "Repeated submission of the same accepted request must not count another admission."
      },
      {
        "title": "Treat access as a state machine",
        "detail": "Separate invited, confirmed, eligible, admitted, cancelled and revoked conditions."
      },
      {
        "title": "Isolate events and roles",
        "detail": "A gate operator for Event A must not search or edit Event B's attendee records."
      },
      {
        "title": "Make exception handling usable",
        "detail": "Define escalation for mismatched names, cancelled tickets, device failure and offline conflicts."
      }
    ],
    "workflow": [
      {
        "title": "Specify the admission policy",
        "detail": "Determine capacity, transfers, re-entry, minors, payment and exception rules before building screens."
      },
      {
        "title": "Model authoritative state",
        "detail": "Keep ticket validity, payment eligibility and check-in events in auditable records."
      },
      {
        "title": "Design the minimum gate interface",
        "detail": "Show a clear accepted/rejected state, actionable reason and safe manual resolution."
      },
      {
        "title": "Test adversarial sequences",
        "detail": "Scan duplicates concurrently, revoke a ticket, queue offline scans, restart a device and retry after timeout."
      },
      {
        "title": "Reconcile with business records",
        "detail": "Cross-check issued tickets, financial eligibility and accepted entries before producing attendance totals."
      }
    ],
    "pitfalls": [
      {
        "title": "Using QR as the source of truth",
        "detail": "A code is a credential, not proof that a ticket is currently valid or unused."
      },
      {
        "title": "Assuming online-only flow",
        "detail": "Gate Wi-Fi loss creates operational failure unless an explicit fallback and reconciliation plan exist."
      },
      {
        "title": "Counting scans as attendees",
        "detail": "Failed scans, retries, staff tests and re-entries can inflate attendance."
      }
    ],
    "measurement": [
      "Track unique authorized admissions, rejected scans by reason, median scan response time, staff override rate, reconciliation conflicts and the time required to close them.",
      "Compare total accepted admissions against authoritative ticket records after the event. Keep financial settlement figures separate from admissions; an attendee can register without attending."
    ],
    "future": "The worthwhile next step is a tabletop rehearsal with gate operators, not a feature list. Run a simulated queue, force connectivity loss and refine the exception paths before any real event use.",
    "takeaways": [
      "A successful check-in is an authoritative, auditable state transition.",
      "Concurrent duplicates must produce at most one admission.",
      "Offline mode trades speed against reconciliation risk.",
      "Payment confirmation and attendance belong to separate processes."
    ],
    "faq": [
      {
        "question": "Can one QR code be scanned twice?",
        "answer": "Technically it can be presented repeatedly. The server should enforce the event's admission policy and reject unauthorized duplicate use."
      },
      {
        "question": "What happens without venue internet?",
        "answer": "Choose an explicit offline fallback, restrict the cached roster, and reconcile conflicts later; do not promise globally unique admission without connectivity."
      },
      {
        "question": "Does a payment success page prove ticket eligibility?",
        "answer": "No. Validate payment through authoritative provider events and server-side state before issuing admission rights."
      }
    ],
    "references": [
      {
        "label": "OWASP Application Security Verification Standard",
        "url": "https://owasp.org/www-project-application-security-verification-standard/"
      },
      {
        "label": "NIST Secure Software Development Framework",
        "url": "https://csrc.nist.gov/Projects/ssdf"
      },
      {
        "label": "NexisHub launch verification field guide",
        "url": "https://nexishub.vercel.app/blog/website-launch-readiness-evidence"
      }
    ]
  },
  {
    "slug": "event-qr-attendance-data",
    "lead": "An event attendance total should be explainable from a ledger of authorized admissions. Scanning a code is an input signal, not the final attendance fact.",
    "overview": [
      "Imagine 500 tickets issued, 430 successful scans, 19 retries, 8 rejected entries and 12 staff overrides. Which number should the organizer call attendance? A system that answers '469 scans' without defining these categories is not a reliable record.",
      "This is a hypothetical worked example for event product architecture. The figures are teaching inputs, not NexisHub operating statistics or a report about a real client."
    ],
    "deepDive": [
      {
        "title": "Worked tally: scans are not people",
        "paragraphs": [
          "Start with an append-only scan event table. Each event has an event ID, credential reference, gate, device, request ID, time and outcome. The event table may contain a successful admission followed by several retries. Count the authorized, unique admission transitions, not the number of rows in the scan log.",
          "If 430 successful scan records include 19 idempotent retries, the accepted admission count may be 411 before considering re-entry and any valid overrides. The exact number depends on whether retries were included in the reported success group and whether the event policy allows multiple admissions. Do not infer the unique count from aggregated labels when the underlying events are unavailable."
        ]
      },
      {
        "title": "A safe reconciliation report",
        "paragraphs": [
          "An organizer's report should expose issued registrations, active ticket eligibility, distinct admitted credentials, manual entries, rejected attempts, offline conflicts and unresolved exceptions. Every number should have a query definition and a timestamp so a reviewer can reproduce it.",
          "Keep identity data out of broad summary views by default. The public dashboard may need only counts and trends, whereas individual admissions should be limited to authorized event staff with a recorded operational purpose. Aggregate carefully for small groups where attendance itself could disclose sensitive facts."
        ]
      },
      {
        "title": "Privacy and retention are design inputs",
        "paragraphs": [
          "QR codes should not embed a person's name, date of birth or phone number just because it simplifies a scan screen. Prefer a short opaque identifier or a properly scoped signed token. Expose only the data required to make the admission decision.",
          "Define retention separately for attendance proof, payment reconciliation, fraud investigation and optional engagement analysis. Obtain the organizer's actual privacy and contractual requirements; do not claim that a generic retention period satisfies every jurisdiction."
        ]
      }
    ],
    "principles": [
      {
        "title": "Keep a unique event ledger",
        "detail": "Record raw scan attempts separately from successful admission state transitions."
      },
      {
        "title": "Document metric definitions",
        "detail": "Every chart should specify its numerator, denominator, filters and time range."
      },
      {
        "title": "Minimize exposed identity",
        "detail": "Gate displays should reveal only data needed to resolve admission."
      },
      {
        "title": "Make corrections auditable",
        "detail": "Staff overrides and reversals need reasons, roles and timestamps."
      }
    ],
    "workflow": [
      {
        "title": "Define admission and re-entry",
        "detail": "Document how transfers, re-entry, cancellations and manual admissions count."
      },
      {
        "title": "Design scan event fields",
        "detail": "Include an event identifier, credential reference, device and outcome code."
      },
      {
        "title": "Apply transactional acceptance",
        "detail": "Allow one authorized transition per required admission unit despite concurrency."
      },
      {
        "title": "Produce reproducible aggregates",
        "detail": "Group by distinct accepted transitions and report unresolved exceptions separately."
      },
      {
        "title": "Exercise privacy and export controls",
        "detail": "Test role isolation, least-privilege exports, retention and deletion pathways."
      }
    ],
    "pitfalls": [
      {
        "title": "Counting every scan as attendance",
        "detail": "Retries and rejected credentials inflate apparent turnout."
      },
      {
        "title": "Embedding identity in the QR code",
        "detail": "Anyone who sees or photographs the code may read unintended personal information."
      },
      {
        "title": "Editing past events silently",
        "detail": "Untracked manual changes make reports impossible to reconcile."
      }
    ],
    "measurement": [
      "Test that repeated requests with the same idempotency key preserve one admission and a stable outcome; then test distinct concurrent keys targeting the same ticket.",
      "Reconcile the aggregate report with the underlying accepted-transition ledger and ensure role-based exports cannot expose unauthorized attendee records."
    ],
    "future": "Reliable attendance analytics can later inform queue staffing, venue operations and event planning, but predictive claims need verified historical data and clear uncertainty boundaries.",
    "takeaways": [
      "A scan attempt and an admitted attendee are different units.",
      "Metrics need reproducible definitions and timestamps.",
      "Opaque credentials reduce accidental identity exposure.",
      "Corrections should preserve traceability instead of rewriting history."
    ],
    "faq": [
      {
        "question": "Should a rejected scan count toward attendance?",
        "answer": "No. It may be counted in operational diagnostics, but it should not be counted as an authorized admission."
      },
      {
        "question": "Do 430 successful scan events prove 430 people attended?",
        "answer": "Not necessarily. Re-entry and retries may produce multiple events. Deduplicate using the event's explicit admission rules."
      },
      {
        "question": "Can organizers export all attendee data?",
        "answer": "Exports should require authorization, purpose checks and the event's privacy and retention rules."
      }
    ],
    "references": [
      {
        "label": "OWASP Authorization Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
      },
      {
        "label": "NIST Privacy Framework",
        "url": "https://www.nist.gov/privacy-framework"
      },
      {
        "label": "NexisHub event registration guide",
        "url": "https://nexishub.vercel.app/blog/reliable-event-registration-checkin"
      }
    ]
  }
];
