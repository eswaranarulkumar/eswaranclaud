export type Project = {
  index: string;
  title: string;
  tag: string;
  description: string;
  href: string;
};

// Bytt tittel, tag og beskrivelse her — kortene oppdateres automatisk.
// Bildene ligger i public/posters/project_01.svg osv. og kan byttes til
// egne .jpg/.png ved å endre filnavnene i components/Projects.tsx.
export const projects: Project[] = [
  {
    index: "01",
    title: "ARCHITECTURAL OS",
    tag: "Digital Platform",
    description:
      "A modular digital platform engineered for scale — structured content, clean systems and effortless publishing.",
    href: "#contact",
  },
  {
    index: "02",
    title: "TERRA INSIGHTS",
    tag: "Data Intelligence Platform",
    description:
      "Global data streams distilled into clear, actionable intelligence with real-time visual dashboards.",
    href: "#contact",
  },
  {
    index: "03",
    title: "LUXOR COMMERCE",
    tag: "E-Commerce System",
    description:
      "A high-performance commerce system built for conversion — fast, cinematic and friction-free.",
    href: "#contact",
  },
];
