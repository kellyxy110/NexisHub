export type ArticleEditorialBoundary = {
  label: string;
  text: string;
};

export function getArticleEditorialBoundary(category: string): ArticleEditorialBoundary {
  if (category === "Healthcare AI") {
    return {
      label: "Healthcare educational boundary",
      text: "This educational guide is not medical advice, clinical validation, legal advice, regulatory approval, or evidence that a healthcare system is ready for deployment. Qualified clinical, privacy, legal, and regulatory review remains necessary for real-world use.",
    };
  }

  if (category === "Education Technology") {
    return {
      label: "Education technology boundary",
      text: "This educational guide discusses technology-supported teaching and learning. It is not a substitute for teacher judgment, school safeguarding, privacy review, or evidence of learning outcomes.",
    };
  }

  if (category === "AI Visibility") {
    return {
      label: "Editorial boundary",
      text: "NexisHub separates verified platform documentation, repeatable observation, and inference. No optimization can guarantee selection or citation by an external system.",
    };
  }

  return {
    label: "Editorial boundary",
    text: "This editorial guide distinguishes documented guidance, repeatable observation, and inference. Examples are illustrative and should be validated in their own context.",
  };
}
