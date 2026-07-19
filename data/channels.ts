export type Channel = {
  id: string;
  number: string; // e.g. "CH_001"
  label: string; // short name in the channel selector
  title: string; // title shown on the player
  description: string;
  poster: string; // path under /public
  video: string; // path under /public — swap with your own MP4/WebM
};

/**
 * BYTT VIDEO HER:
 * 1. Legg MP4-filene dine i /public/videos/ (f.eks. showreel.mp4)
 * 2. Oppdater `video`-feltet under til riktig filnavn
 * 3. (Valgfritt) Bytt posterbildet i /public/posters/
 */
export const channels: Channel[] = [
  {
    id: "showreel",
    number: "CH_001",
    label: "SHOWREEL",
    title: "ESWARAN ARULKUMAR — DIGITAL EXPERIENCE",
    description: "A curated transmission of selected work across web, AI and visual systems.",
    poster: "/posters/ch_001.svg",
    video: "/videos/ch_001.mp4",
  },
  {
    id: "case-study",
    number: "CH_002",
    label: "CASE STUDY",
    title: "CASE STUDY — SYSTEMS IN PRODUCTION",
    description: "Deep dive into a real project: architecture, design decisions and results.",
    poster: "/posters/ch_002.svg",
    video: "/videos/ch_002.mp4",
  },
  {
    id: "experiment",
    number: "CH_003",
    label: "EXPERIMENT",
    title: "EXPERIMENT — VISUAL LAB TRANSMISSION",
    description: "Prototypes and experiments from the lab: generative visuals and interactions.",
    poster: "/posters/ch_003.svg",
    video: "/videos/ch_003.mp4",
  },
];
