import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eswaran Arulkumar — Digital Systems",
  description:
    "I design and build intelligent digital systems: web, AI, design and automation.",
};

export const viewport: Viewport = {
  themeColor: "#04070f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Rajdhani:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="grid-bg" aria-hidden="true" />
        {children}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Fail-safe: if the intro/animations crash for any reason, force all
            content visible after 5s so the page can never stay black. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){try{var b=document.getElementById('boot-overlay');if(b)b.style.display='none';var h=document.querySelector('header');if(h&&getComputedStyle(h).opacity==='0'){document.querySelectorAll('[style]').forEach(function(el){var o=getComputedStyle(el).opacity;if(o==='0'){el.style.opacity='1';el.style.transform='none';}});}}catch(e){}},5000);`,
          }}
        />
      </body>
    </html>
  );
}
