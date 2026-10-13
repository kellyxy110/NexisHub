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

  return {
    label: "Editorial boundary",
    text: "NexisHub separates verified platform documentation, repeatable observation, and inference. No optimization can guarantee selection or citation by an external system.",
  };
}
