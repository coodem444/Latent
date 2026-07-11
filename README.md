# LATENT — Landing de ingeniería de rendimiento para Windows

Proyecto Next.js 14 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Notas de fuentes

Este proyecto está diseñado alrededor de **Inter** (display + body) e
**IBM Plex Mono** (datos/mono), cargadas vía `next/font/google` para
self-hosting sin CLS. El entorno en el que se generó este código no tenía
acceso de red a `fonts.googleapis.com`, así que `app/fonts.css` define las
mismas tres variables CSS (`--font-display`, `--font-body`, `--font-mono`)
contra una pila de fuentes de sistema de alta calidad como fallback.

Para restaurar las tipografías originales en un entorno normal (local o
Vercel), sigue las instrucciones comentadas en la cabecera de
`app/fonts.css` y en `app/layout.tsx`: son ~15 líneas, ya escritas y listas
para descomentar/pegar.

## Estructura

- `app/` — layout raíz, metadata SEO, página principal
- `components/sections/` — las 10 secciones narrativas (Hero → CTA final)
- `components/ui/` — átomos reutilizables (botón magnético, reveal de texto, contador)
- `components/WaveformCanvas.tsx` — elemento signature: osciloscopio de frame-time
- `lib/` — hooks compartidos

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis
