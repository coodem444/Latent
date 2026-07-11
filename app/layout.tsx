import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Font loading note: in a normal deployment (Vercel or any standard host)
 * this project uses next/font/google to self-host Inter + IBM Plex Mono
 * at build time, with zero runtime requests and no layout shift. The
 * sandbox this was authored in has no network access to
 * fonts.googleapis.com, so fonts.css defines the same three CSS variables
 * (--font-display, --font-body, --font-mono) against a high-quality system
 * stack instead. fonts.css contains the exact next/font snippet to restore.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://latent.systems"),
  title: {
    default: "LATENT — Optimización de rendimiento para Windows competitivo",
    template: "%s — LATENT",
  },
  description:
    "Eliminamos stuttering, reducimos input lag y estabilizamos tus 1% y 0.1% lows con telemetría real: LatencyMon, CapFrameX, gestión de interrupciones (MSI) y C-States. Diagnóstico y optimización a medida para jugadores competitivos.",
  keywords: [
    "reducción de latencia DPC",
    "optimización input lag",
    "1% low FPS",
    "0.1% low FPS",
    "frame pacing",
    "debloating Windows",
    "gestión de interrupciones MSI",
    "C-States",
    "optimización BIOS gaming",
    "LatencyMon",
    "CapFrameX",
  ],
  openGraph: {
    title: "LATENT — Optimización de rendimiento para Windows competitivo",
    description:
      "Cero stuttering. Input lag medido en milisegundos. 1% low estable, frame tras frame. Optimización basada en telemetría real, no en guías genéricas.",
    url: "https://latent.systems",
    siteName: "LATENT",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LATENT — Optimización de rendimiento para Windows competitivo",
    description: "Cero stuttering. Input lag medido en milisegundos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
