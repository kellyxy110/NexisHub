import type { VisibilityGuide } from "@/lib/visibility-content";
export const discoveryOriginalGuide: VisibilityGuide = {
  "slug": "methodology-case-study-ai-discovery",
  "lead": "This is an internal methodology case, not a fabricated customer success story. It documents how NexisHub can assess a public website's machine discovery readiness without claiming that route repairs have already improved AI citations.",
  "overview": [
    "AI discovery includes access, source identity, extractable content, retrieval and accurate representation. A web server returning 200 addresses only part of this chain. NexisHub's publicly described AI Visibility Index is a pre-review version 0.1 framework; it is not a validated ranking of organizations.",
    "The bounded case subject is NexisHub's own company website, whose AdSense-submitted hostname initially pointed to an outdated Vercel release. Correcting that alias was a verified access and publishing improvement. The team did not measure a before-and-after rise in ChatGPT or Google AI citations, and this guide will not invent one."
  ],
  "deepDive": [
    {
      "title": "Define the observed problem before claiming an outcome",
      "paragraphs": [
        "On the newer Vercel Production hostname four newly published NexisHub guides loaded normally. On `nexishub.vercel.app`, the address submitted to Google AdSense, one returned HTTP 404. Reading the Vercel alias metadata revealed that the submitted hostname still mapped to an older deployment. This was a reproducible routing discrepancy, not a model-specific ranking problem.",
        "The intervention was limited to assigning the existing hostname to the verified latest Production release. Afterwards the four articles loaded on the submitted hostname and its sitemap contained their canonical URLs among 87 listed pages. Neither fact demonstrates AI retrieval, citation frequency or changes in business traffic."
      ]
    },
    {
      "title": "Build a machine-discovery evidence ledger",
      "paragraphs": [
        "For each sampled page record timestamp, full requested URL, status code, redirect destination, declared canonical, robots directives, sitemap listing, visible subject definition, byline, dates, source references and usable passages. Preserve snapshots and deployment SHA so a reviewer can distinguish a changed page from a changed observation environment.",
        "Keep four columns separate: observed fact, hypothesis, intervention and validated follow-up. `The submitted article URL returned 404` is an observation. `The alias was attached to an older deploy` is a provider-verified explanation. `Updating the alias will increase model citations` is a hypothesis that would require independent testing."
      ]
    },
    {
      "title": "Do not collapse retrieval into citation",
      "paragraphs": [
        "The Nexis Research Institute's AI Visibility Index working paper proposes distinct dimensions for access, identity, semantic clarity, evidence, retrieval presence, representation accuracy and attribution. Its repository publication registry explicitly labels the paper Pre-Review, version 0.1, with no DOI, pilot data or validated organization rankings.",
        "A cautious future AI-observation study should pre-register representative questions, specify the systems and modes being tested, repeat sampling over time and preserve exact model outputs. Record appearances, source retrieval, clickable citations and accurate brand descriptions separately. Reviewer disagreement and null results belong in the published limitations rather than being hidden in a composite score."
      ]
    },
    {
      "title": "Content improvements that have a defensible rationale",
      "paragraphs": [
        "Improve passages that are ambiguous when extracted from a page: identify the organization, clarify what its product does, distinguish a planned module from a live capability, and cite the evidence behind each claim. Maintain internal links and canonical consistency so important pages can be found without opaque interactions.",
        "Where an archive was generated from common editorial boilerplate, publication volume can obscure distinct value. Replace generic copy with measured engineering observations, implementation diagrams, actual code boundaries and limitations. Never invent a customer's uplift, permission or performance percentages in order to make a case study appear stronger."
      ]
    }
  ],
  "principles": [
    {
      "title": "Describe the real subject",
      "detail": "Label this work as an internal NexisHub site observation, not a commissioned client case."
    },
    {
      "title": "Preserve evidence categories",
      "detail": "Do not promote hypotheses or diagnostic scores into citations or business outcomes."
    },
    {
      "title": "Make improvements reproducible",
      "detail": "Record hostnames, dates, source commits and observed response states."
    }
  ],
  "workflow": [
    {
      "title": "Select representative sources",
      "detail": "List actual pages and their intended subject and canonical host."
    },
    {
      "title": "Capture baseline observations",
      "detail": "Store HTTP, index controls, identity and content snapshots."
    },
    {
      "title": "Diagnose one defect",
      "detail": "Confirm root causes through repository and provider evidence."
    },
    {
      "title": "Recheck after intervention",
      "detail": "Repeat the same URLs under comparable conditions."
    },
    {
      "title": "Plan optional AI sampling",
      "detail": "Only then define prompt sets, review categories and outcome limitations."
    }
  ],
  "pitfalls": [
    {
      "title": "Fictional success metrics",
      "detail": "Technical repair does not establish citation increases."
    },
    {
      "title": "Unvalidated scoring",
      "detail": "A pre-review framework must not be presented as calibrated external authority."
    },
    {
      "title": "Host confusion",
      "detail": "A sitemap or canonical pointing to an older alias can mask new content."
    }
  ],
  "measurement": [
    "Publish the count of pages whose canonical host, status and accessible content have been directly verified.",
    "Future AI observations should report sample size, date, provider, prompt set and source citation count separately, including non-results."
  ],
  "future": "Independent review and a reproducible observation dataset can improve this methodology, but meaningful uncertainty must remain visible.",
  "takeaways": [
    "The case uses NexisHub's own website, not an invented client.",
    "The hostname correction was verified, but AI citation uplift was not measured.",
    "The AI Visibility Index remains a pre-review framework.",
    "Evidence logs matter more than impressive-looking scores."
  ],
  "faq": [
    {
      "question": "Did this intervention increase AI citations?",
      "answer": "No before-and-after model citation study was completed, so such an improvement is not claimed."
    },
    {
      "question": "Is this a client case study?",
      "answer": "No. The described implementation concerns NexisHub's own site."
    },
    {
      "question": "Is the proposed AI Visibility Index validated?",
      "answer": "Version 0.1 is explicitly pre-review and does not publish a validated ranking."
    }
  ],
  "references": [
    {
      "label": "NexisHub AI Visibility Index working paper",
      "url": "https://nexishub.vercel.app/research/ai-visibility-index"
    },
    {
      "label": "Google Search technical requirements",
      "url": "https://developers.google.com/search/docs/essentials/technical"
    },
    {
      "label": "NexisHub release incident",
      "url": "https://nexishub.vercel.app/blog/vercel-nextjs-deployment-debugging"
    }
  ]
};
