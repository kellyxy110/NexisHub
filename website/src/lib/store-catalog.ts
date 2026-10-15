export type PlannedStoreResource = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  audience: string;
  purpose: string;
  possibleContents: readonly string[];
  status: "planned";
};

export const plannedStoreResources: readonly PlannedStoreResource[] = [
  {
    slug: "ai-visibility-toolkit",
    title: "AI Visibility Toolkit",
    category: "Search intelligence",
    summary: "A practical collection of checklists and worksheets for reviewing how a website communicates with search engines and AI systems.",
    audience: "Website owners, founders, marketers and technical teams",
    purpose: "Help teams organise an evidence-based website visibility review before deciding what to improve.",
    possibleContents: ["Website discoverability checklist", "Content and entity review worksheet", "Prioritised improvement-plan template"],
    status: "planned",
  },
  {
    slug: "product-discovery-workbook",
    title: "Product Discovery Workbook",
    category: "Product engineering",
    summary: "A structured guide for defining a problem, validating assumptions, and preparing a focused software product brief.",
    audience: "Founders, product teams and independent builders",
    purpose: "Turn early product ideas into clear, testable assumptions and a realistic first-release scope.",
    possibleContents: ["Problem framing prompts", "Assumption and interview worksheets", "First-release scope template"],
    status: "planned",
  },
  {
    slug: "learning-design-templates",
    title: "Learning Design Templates",
    category: "Education",
    summary: "Planned templates for turning lessons into exploration, practice, assessment, and revision activities.",
    audience: "Teachers, tutors and instructional designers",
    purpose: "Support the planning of structured, interactive learning experiences.",
    possibleContents: ["Lesson exploration planner", "Practice and assessment outline", "Mastery and revision tracking template"],
    status: "planned",
  },
];

export function getPlannedStoreResource(slug: string): PlannedStoreResource | undefined {
  return plannedStoreResources.find((resource) => resource.slug === slug);
}
