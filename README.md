# Eswaran Arulkumar — Portfolio

Futuristisk portfolio-/referanseside bygget med **Next.js 15 + TypeScript + Tailwind CSS 4 + Framer Motion**.

Mørk, filmatisk broadcast-estetikk: cyan/blått neonlys, oransje signaldetaljer, scanlines, TV-støy og holografiske dataelementer. Intro-animasjonen spilles én gang ved sidelast (~3–4 s desktop, ~1,3 s mobil) og respekterer `prefers-reduced-motion`.

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produksjonsbygg
```

## Slik bytter du innhold

### Videoer (broadcast-kanalene)

1. Legg MP4-filene dine i `public/videos/` — f.eks. `ch_001.mp4`, `ch_002.mp4`, `ch_003.mp4`.
2. Åpne **`data/channels.ts`** og oppdater `video`, `title`, `description` og `label` for hver kanal.
3. Bytt posterbilder ved å erstatte filene i `public/posters/` (behold filnavn, eller oppdater `poster`-feltet). Bruk gjerne JPG/PNG i 16:9 (f.eks. 1280×720).

Videoene lazy-loades (`preload="none"`) og autospilles uten lyd når introen er ferdig. Mangler videofilen, vises posterbildet i stedet — siden fungerer altså fint før du har lagt inn videoer.

### Prosjektkort

Rediger **`data/projects.ts`** — tittel, tag, beskrivelse og lenke per kort. Kortbildene ligger i `public/posters/project_01.svg` osv.

### Tekst og lenker

- Hero-tekst og CTA-er: `components/Hero.tsx`
- Meny: `components/Header.tsx` (`LINKS`-listen)
- Kontakt (e-post): `components/Contact.tsx`
- Farger og fonter: `app/globals.css` (`@theme`-blokken) og `app/layout.tsx`

## Struktur

```
app/
  layout.tsx        Fonter, metadata, globale lag (grid + noise)
  page.tsx          Setter sammen seksjonene
  globals.css       Tema, scanlines, static, glitch, hologram-animasjoner
components/
  IntroContext.tsx  Intro-tidslinjen (faser med desktop/mobil-timing)
  BootOverlay.tsx   Svart oppstartsskjerm med svak støy
  Header.tsx        Sticky glass-header + hamburger
  Hero.tsx          Overskrift, CTA-er, datafelt
  Hologram.tsx      SVG data-kjerne med ringer og orbits
  Broadcast.tsx     Videoskjerm, kontroller, kanalbytte m/ static+glitch
  Projects.tsx      Tre prosjektkort med hover-glød
  Contact.tsx       CTA + footer
data/
  channels.ts       Video-kanalene (bytt video/tekst her)
  projects.ts       Prosjektkortene
public/
  posters/          Posterbilder (SVG-plassholdere)
  videos/           Legg MP4-filene dine her
```

## Ytelse og tilgjengelighet

- Videoer: `preload="none"`, autoplay kun muted, poster som fallback
- `prefers-reduced-motion`: intro hoppes over, orbits/static/glitch slås av
- Fonter via Google Fonts med preconnect, semantisk HTML, ARIA-labels på kontroller
