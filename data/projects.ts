export type Project = {
  index: string;
  title: string;
  tag: string;
  description: string;
  href: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "WEB EXPERIENCES",
    tag: "NEXT.JS / MOTION / 3D",
    description:
      "High-performance sites and interactive experiences engineered for speed, story and conversion.",
    href: "#contact",
  },
  {
    index: "02",
    title: "AI SYSTEMS",
    tag: "LLM / AUTOMATION / DATA",
    description:
      "Intelligent assistants, content pipelines and automation that remove friction from real workflows.",
    href: "#contact",
  },
  {
    index: "03",
    title: "VISUAL LAB",
    tag: "DESIGN / GENERATIVE / BRAND",
    description:
      "Exploratory design systems, generative identity work and cinematic visual language.",
    href: "#contact",
  },
];
