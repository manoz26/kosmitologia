"use client";

/* ══════════════════════════════════════════════════════════════════════════
   CampusFlyMap — the real map of «Πού διεξάγονται τα μαθήματα»
   ──────────────────────────────────────────────────────────────────────────
   A satellite map that opens on the whole Earth, seen from space, and — once
   the frame is on screen — flies down over Greece and Thessaloniki to the
   Department's building in the Αλεξάνδρεια Πανεπιστημιούπολη, tilting into a
   3D view as it lands. On landing the building rises in λαχανί, a flag names
   it and the camera drifts slowly round it until the visitor takes over
   (drag, Ctrl/⌘ + scroll, the +/- buttons); «Πτήση ξανά» flies in again.
   Reduced motion: the map simply opens on the landing view.

   Engine: MapLibre GL JS v6 — open source, no API key. Layers:
     • satellite . Esri World Imagery (attribution required — see SATELLITE)
     • labels .... OpenFreeMap vector tiles (OpenStreetMap data), Greek names:
                   countries, the sea, cities, towns
     • campus .... the campus fence and the Department's building, footprints
                   from OpenStreetMap (ways 179311665 and 372296618)
   The globe projection gives the "from space" opening with its atmosphere;
   MapLibre turns it into the flat map by itself as the camera descends. The
   landing tiles are prefetched while the visitor is still scrolling, so the
   last seconds of the flight land on sharp imagery.

   Client-only and heavy: CampusMap3D loads it lazily, near the viewport. A
   browser without WebGL2 gets a Google Maps satellite embed of the spot.
   Styles for the flag and the map's controls: globals.css («Campus map»).
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import {
  FullscreenControl,
  MapLibreMap,
  Marker,
  NavigationControl,
  setWorkerUrl,
  type ExpressionSpecification,
  type PaddingOptions,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cubicBezier } from "framer-motion";
import { RotateCcw } from "lucide-react";

import { contact, program } from "@/data/program";
import { cn } from "@/lib/utils";

/* MapLibre v6 parses tiles in a module worker; under Turbopack it has to be
   pointed at it (MapLibre docs → Installation → Turbopack). */
setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).toString());

/* ── Where ──────────────────────────────────────────────────────────────── */

type LngLat = [number, number];

/** The Department's building (program.ts → location). The flag stands on it. */
const BUILDING: LngLat = [program.location.value.lng, program.location.value.lat];

/** Its footprint (OpenStreetMap way 372296618, «Τμήμα Διατροφής και
    Διαιτολογίας») — raised in 3D on landing. */
const BUILDING_FOOTPRINT: LngLat[] = [
  [22.8036942, 40.6582787], [22.8036948, 40.6583091], [22.8038611, 40.6583073], [22.8038598, 40.6582387],
  [22.8038886, 40.6582383], [22.8038881, 40.6582132], [22.8038727, 40.6582134], [22.8038707, 40.6581119],
  [22.8038525, 40.6581121], [22.8038492, 40.657939], [22.8036516, 40.6579412], [22.803653, 40.6580122],
  [22.8035741, 40.6580131], [22.8035792, 40.65828], [22.8036942, 40.6582787],
];

/** The campus fence (OpenStreetMap way 179311665) — the 1.600 στρέμματα. */
const CAMPUS_FENCE: LngLat[] = [
  [22.8016889, 40.6558706], [22.8015283, 40.6560257], [22.8015411, 40.6563357], [22.8015527, 40.656993],
  [22.8016003, 40.6570215], [22.801673, 40.6570443], [22.8017131, 40.658083], [22.8016151, 40.6582361],
  [22.8016275, 40.6583618], [22.8016687, 40.6592995], [22.801669, 40.6594621], [22.8016789, 40.6595009],
  [22.8017, 40.6595245], [22.8017333, 40.6595397], [22.8031513, 40.6595036], [22.803543, 40.6594936],
  [22.8054618, 40.6594791], [22.8065003, 40.6593541], [22.8065509, 40.6591931], [22.8074712, 40.6590401],
  [22.8088708, 40.6590658], [22.8116494, 40.6591677], [22.8116533, 40.6612661], [22.8117067, 40.6612666],
  [22.8118414, 40.6612683], [22.8196434, 40.6613423], [22.8200204, 40.6613459], [22.8200441, 40.6610654],
  [22.8202149, 40.6590485], [22.8199989, 40.6585983], [22.8199968, 40.6583298], [22.8200165, 40.6554061],
  [22.8200171, 40.6553471], [22.8200241, 40.6546724], [22.8200286, 40.6536009], [22.8200231, 40.6529699],
  [22.8145654, 40.6529522], [22.8117761, 40.6529431], [22.8116277, 40.6529483], [22.8087863, 40.6529609],
  [22.8061077, 40.6529727], [22.8059171, 40.6531101], [22.8053694, 40.6534731], [22.8048153, 40.653643],
  [22.8039312, 40.6541979], [22.802532, 40.6551591], [22.8016889, 40.6558706],
];

/** Same spot for the no-WebGL fallback. */
const FALLBACK_EMBED = `https://maps.google.com/maps?q=${BUILDING[1]},${BUILDING[0]}&t=k&z=17&hl=el&output=embed`;

/* ── Tiles ──────────────────────────────────────────────────────────────── */

/* Esri World Imagery: free with the attribution below. Esri's terms ask a
   production site for a (free) ArcGIS Location Platform account — if the
   site ever needs one, its keyed tile URL goes here. */
const SATELLITE =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const SATELLITE_ATTRIBUTION =
  'Δορυφορικές εικόνες © <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a>, Maxar, Earthstar Geographics';
/* OpenFreeMap: OpenStreetMap vector tiles and fonts, no key, no limits; its
   attribution comes with the tiles. */
const LABELS = "https://tiles.openfreemap.org/planet";
const GLYPHS = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";

/* ── Camera ─────────────────────────────────────────────────────────────── */

interface View {
  center: LngLat;
  zoom: number;
  pitch: number;
  bearing: number;
  padding: PaddingOptions;
}

const NO_PADDING: PaddingOptions = { top: 0, bottom: 0, left: 0, right: 0 };

/** From space: the whole globe, turned west of Greece so the flight swings
    it round. The zoom fits the globe to ~86% of the frame's shorter side —
    at zoom z MapLibre's globe is 512·2ᶻ px round, a radius of 512·2ᶻ / 2π. */
function spaceView(w: number, h: number): View {
  const radius = Math.min(w, h) * 0.43;
  const zoom = Math.log2((radius * 2 * Math.PI) / 512);
  return { center: [8, 34], zoom, pitch: 0, bearing: 0, padding: NO_PADDING };
}

/** The landing: tilted, looking north-east across the campus, with the
    building a little below the middle so its flag stands in the centre. */
function landingView(w: number): View {
  const narrow = w < 560;
  return {
    center: BUILDING,
    zoom: narrow ? 16.3 : 16.9,
    pitch: 58,
    bearing: 42,
    padding: { ...NO_PADDING, top: narrow ? 90 : 130 },
  };
}

const FLIGHT_MS = 8800;
/** Slow lift-off, long gentle landing. */
const flightEase = cubicBezier(0.42, 0, 0.1, 1);
/** After landing the camera keeps turning this far, this slowly. */
const DRIFT_DEG = 24;
const DRIFT_MS = 26000;
/** The building's height once raised (≈ two storeys), metres. */
const BUILDING_HEIGHT = 9;

/* ── Style ──────────────────────────────────────────────────────────────── */

const NAME: ExpressionSpecification = ["coalesce", ["get", "name:el"], ["get", "name"]];
const LABEL_PAINT = {
  "text-color": "#ffffff",
  "text-halo-color": "rgba(17, 24, 10, 0.78)",
  "text-halo-width": 1.3,
  "text-halo-blur": 0.5,
};

function polygon(ring: LngLat[]) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: { type: "Polygon" as const, coordinates: [ring] },
  };
}

function buildStyle(raised: boolean): StyleSpecification {
  return {
    version: 8,
    projection: { type: "globe" },
    glyphs: GLYPHS,
    sky: {
      /* the blue rim of the Earth from space, gone by the time we reach Greece */
      "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 5, 1, 7, 0],
      "sky-color": "#86acd6",
      "horizon-color": "#dce8f2",
      "fog-color": "#e8eff3",
      "sky-horizon-blend": 0.6,
      "horizon-fog-blend": 0.7,
      "fog-ground-blend": 0.8,
    },
    sources: {
      satellite: {
        type: "raster",
        tiles: [SATELLITE],
        tileSize: 256,
        maxzoom: 19,
        attribution: SATELLITE_ATTRIBUTION,
      },
      labels: { type: "vector", url: LABELS },
      campus: { type: "geojson", data: polygon(CAMPUS_FENCE) },
      building: { type: "geojson", data: polygon(BUILDING_FOOTPRINT) },
    },
    layers: [
      /* the globe's surface while the imagery loads */
      { id: "ground", type: "background", paint: { "background-color": "#0d2236" } },
      {
        id: "satellite",
        type: "raster",
        source: "satellite",
        paint: { "raster-fade-duration": 250, "raster-saturation": 0.06, "raster-contrast": 0.05 },
      },

      /* the campus fence */
      {
        id: "campus-fill",
        type: "fill",
        source: "campus",
        minzoom: 12,
        paint: {
          "fill-color": "#C8E25E",
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 14, 0.1, 17, 0.06],
        },
      },
      {
        id: "campus-line",
        type: "line",
        source: "campus",
        minzoom: 12,
        layout: { "line-join": "round" },
        paint: {
          "line-color": "#E6F6A2",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1, 17, 2.4],
          "line-dasharray": [2, 1.4],
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 13.5, 0.9],
        },
      },

      /* the building: a soft glow on the ground, then the block itself */
      {
        id: "building-glow",
        type: "line",
        source: "building",
        minzoom: 14,
        paint: {
          "line-color": "#D4EC6A",
          "line-width": 10,
          "line-blur": 8,
          "line-opacity": raised ? 0.85 : 0,
          "line-opacity-transition": { duration: 900, delay: 300 },
        },
      },
      {
        id: "building-3d",
        type: "fill-extrusion",
        source: "building",
        minzoom: 14,
        paint: {
          "fill-extrusion-color": "#B9D84A",
          "fill-extrusion-opacity": 0.92,
          "fill-extrusion-height": raised ? BUILDING_HEIGHT : 0,
          "fill-extrusion-height-transition": { duration: 1400, delay: 0 },
          "fill-extrusion-vertical-gradient": true,
        },
      },

      /* names, in Greek */
      {
        id: "label-sea",
        type: "symbol",
        source: "labels",
        "source-layer": "water_name",
        filter: ["match", ["get", "class"], ["ocean", "sea", "bay", "strait"], true, false],
        minzoom: 4,
        maxzoom: 12,
        layout: {
          "text-field": NAME,
          "text-font": ["Noto Sans Italic"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 4, 10, 10, 14],
          "text-letter-spacing": 0.08,
          "text-max-width": 7,
        },
        paint: {
          "text-color": "#d9ecff",
          "text-halo-color": "rgba(6, 22, 38, 0.7)",
          "text-halo-width": 1.2,
        },
      },
      {
        id: "label-country",
        type: "symbol",
        source: "labels",
        "source-layer": "place",
        filter: ["==", ["get", "class"], "country"],
        minzoom: 2.6,
        maxzoom: 7,
        layout: {
          "text-field": NAME,
          "text-font": ["Noto Sans Bold"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 3, 11, 6, 15],
          "text-letter-spacing": 0.05,
          "text-max-width": 8,
        },
        paint: { ...LABEL_PAINT, "text-opacity": 0.92 },
      },
      {
        id: "label-city",
        type: "symbol",
        source: "labels",
        "source-layer": "place",
        filter: ["==", ["get", "class"], "city"],
        minzoom: 4.5,
        maxzoom: 13.5,
        layout: {
          "text-field": NAME,
          "text-font": ["Noto Sans Bold"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 5, 11, 9, 16, 12, 19],
          "symbol-sort-key": ["get", "rank"],
          "text-max-width": 8,
        },
        paint: LABEL_PAINT,
      },
      {
        id: "label-town",
        type: "symbol",
        source: "labels",
        "source-layer": "place",
        filter: ["match", ["get", "class"], ["town", "village"], true, false],
        minzoom: 10.5,
        maxzoom: 17,
        layout: {
          "text-field": NAME,
          "text-font": ["Noto Sans Bold"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 11, 11, 15, 14],
          "symbol-sort-key": ["get", "rank"],
          "text-max-width": 8,
        },
        paint: LABEL_PAINT,
      },
    ],
  };
}

/* MapLibre's own strings, in Greek. */
const EL_LOCALE: Record<string, string> = {
  "AttributionControl.ToggleAttribution": "Πηγές χάρτη",
  "FullscreenControl.Enter": "Πλήρης οθόνη",
  "FullscreenControl.Exit": "Έξοδος από πλήρη οθόνη",
  "Map.Title": "Χάρτης",
  "Marker.Title": "Σημείο στον χάρτη",
  "NavigationControl.ResetBearing": "Σύρετε για περιστροφή, πατήστε για επαναφορά στον βορρά",
  "NavigationControl.ZoomIn": "Μεγέθυνση",
  "NavigationControl.ZoomOut": "Σμίκρυνση",
  "CooperativeGesturesHandler.WindowsHelpText": "Ctrl + κύλιση για ζουμ στον χάρτη",
  "CooperativeGesturesHandler.MacHelpText": "⌘ + κύλιση για ζουμ στον χάρτη",
  "CooperativeGesturesHandler.MobileHelpText": "Μετακινήστε τον χάρτη με δύο δάχτυλα",
};

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** The satellite tiles the landing view needs most — fetched ahead so the
    end of the flight is sharp. A small ring around the building per zoom. */
function landingTiles(): string[] {
  const urls: string[] = [];
  const [lng, lat] = BUILDING;
  for (const z of [15, 16, 17, 18]) {
    const n = 2 ** z;
    const r = (lat * Math.PI) / 180;
    const cx = Math.floor(((lng + 180) / 360) * n);
    const cy = Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        urls.push(
          SATELLITE.replace("{z}", String(z))
            .replace("{x}", String(cx + dx))
            .replace("{y}", String(cy + dy)),
        );
      }
    }
  }
  return urls;
}

/** Roughly how high the camera is: metres per pixel at the centre, times the
    distance from the eye to the screen in pixels, times cos(pitch). */
function cameraAltitude(map: MapLibreMap, heightPx: number): number {
  const { lat } = map.getCenter();
  const metresPerPx = (40075016.686 * Math.cos((lat * Math.PI) / 180)) / (512 * 2 ** map.getZoom());
  const fov = (map.getVerticalFieldOfView() * Math.PI) / 180;
  const eye = heightPx / 2 / Math.tan(fov / 2);
  return metresPerPx * eye * Math.cos((map.getPitch() * Math.PI) / 180);
}

function formatAltitude(m: number): string {
  if (m >= 10000) return `${Math.round(m / 1000).toLocaleString("el-GR")} χλμ`;
  if (m >= 1000) return `${(m / 1000).toLocaleString("el-GR", { maximumFractionDigits: 1 })} χλμ`;
  return `${Math.round(m / 10) * 10} μ`;
}

/** The flag over the building: a card, a stem and a pulsing dot. Built as
    DOM because a MapLibre marker takes an element. */
function makeFlag(): HTMLDivElement {
  const flag = document.createElement("div");
  flag.className = "campus-flag";
  const card = document.createElement("div");
  card.className = "campus-flag__card";
  const eyebrow = document.createElement("span");
  eyebrow.className = "campus-flag__eyebrow";
  eyebrow.textContent = `${contact.campus.value} · Σίνδος`;
  const title = document.createElement("strong");
  title.className = "campus-flag__title";
  title.textContent = program.department.value;
  card.append(eyebrow, title);
  const stem = document.createElement("span");
  stem.className = "campus-flag__stem";
  const dot = document.createElement("span");
  dot.className = "campus-flag__dot";
  flag.append(card, stem, dot);
  return flag;
}

function hasWebGL2(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function CampusFlyMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const altitudeRef = useRef<HTMLSpanElement>(null);
  const replayRef = useRef<() => void>(() => {});
  /* Client-only component (loaded with ssr: false), so reading the browser
     in the initialisers is safe. */
  const [webgl] = useState(hasWebGL2);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !webgl) return;

    const space = spaceView(el.clientWidth, el.clientHeight);
    const landing = landingView(el.clientWidth);

    /* Warm the HTTP cache with the landing imagery. */
    const prefetch = new AbortController();
    for (const url of landingTiles()) {
      fetch(url, { mode: "cors", credentials: "omit", signal: prefetch.signal }).catch(() => {});
    }

    let map: MapLibreMap;
    try {
      map = new MapLibreMap({
        container: el,
        style: buildStyle(reduced),
        ...(reduced ? landing : space),
        maxZoom: 18,
        cooperativeGestures: true,
        /* MapLibre's default: written out on a wide frame, an (i) on a narrow one */
        attributionControl: {},
        locale: EL_LOCALE,
        fadeDuration: 250,
      });
    } catch {
      /* GPUInitializationError: WebGL2 exists but can't be used */
      prefetch.abort();
      const t = window.setTimeout(() => setFailed(true), 0);
      return () => window.clearTimeout(t);
    }

    map.addControl(new NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new FullscreenControl(), "top-right");

    const flag = makeFlag();
    if (reduced) flag.classList.add("is-landed");
    new Marker({ element: flag, anchor: "bottom", offset: [0, 7], subpixelPositioning: true })
      .setLngLat(BUILDING)
      .addTo(map);

    const showAltitude = () => {
      if (altitudeRef.current) {
        altitudeRef.current.textContent = formatAltitude(cameraAltitude(map, el.clientHeight));
      }
    };
    map.on("move", showAltitude);

    const setLanded = (on: boolean) => {
      flag.classList.toggle("is-landed", on);
      map.setPaintProperty("building-3d", "fill-extrusion-height", on ? BUILDING_HEIGHT : 0);
      map.setPaintProperty("building-glow", "line-opacity", on ? 0.85 : 0);
      /* On a narrow frame the attribution, shown in full during the flight,
         folds into its (i) on landing — what MapLibre does on a first drag. */
      if (on) el.querySelector(".maplibregl-compact-show")?.classList.remove("maplibregl-compact-show");
    };

    const timers: number[] = [];
    const fly = () => {
      map.flyTo({ ...landing, duration: FLIGHT_MS, curve: 1.6, easing: flightEase, essential: true });
      map.once("moveend", () => {
        setLanded(true);
        /* Drift on only if the flight wasn't cut short by the visitor. */
        if (Math.abs(map.getZoom() - landing.zoom) < 0.05) {
          map.easeTo({ bearing: landing.bearing + DRIFT_DEG, duration: DRIFT_MS, easing: (t) => t });
        }
      });
    };

    replayRef.current = () => {
      map.stop();
      setLanded(false);
      map.jumpTo(space);
      timers.push(window.setTimeout(fly, 450));
    };

    let observer: IntersectionObserver | undefined;
    map.once("load", () => {
      setReady(true);
      showAltitude();
      if (reduced) return;
      /* Take off once most of the frame is on screen. */
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            timers.push(window.setTimeout(fly, 600));
          }
        },
        { threshold: 0.55 },
      );
      observer.observe(el);
    });

    return () => {
      observer?.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      prefetch.abort();
      replayRef.current = () => {};
      map.remove();
    };
  }, [webgl, reduced]);

  if (!webgl || failed) {
    return (
      <iframe
        src={FALLBACK_EMBED}
        title={`Χάρτης: ${contact.campus.value}, Σίνδος`}
        className={cn("h-full w-full border-0", className)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className={cn("campus-map relative h-full w-full", className)}>
      {/* h-full, not absolute: MapLibre's stylesheet makes its container
          position: relative */}
      <div
        ref={containerRef}
        role="region"
        aria-label={`Δορυφορικός χάρτης: ${program.department.value}, ${contact.campus.value}, Σίνδος`}
        className="h-full w-full"
      />

      {/* while the first tiles load */}
      <p
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute left-4 top-4 text-xs font-semibold text-white/75 transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        {ready ? "" : "Φόρτωση δορυφορικού χάρτη…"}
      </p>

      {/* replay + the camera's altitude, Google-Earth style (top-left: the
          bottom edge belongs to the attribution) */}
      <div
        className={cn(
          "pointer-events-none absolute left-2.5 top-2.5 flex items-center gap-2 transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      >
        {!reduced && (
          <button
            type="button"
            onClick={() => replayRef.current()}
            className="pointer-events-auto inline-flex items-center gap-1.5 bg-white/90 px-3 py-1.5 text-xs font-bold text-ihu-green-dark shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md transition-colors hover:bg-white"
          >
            <RotateCcw size={13} strokeWidth={2.4} aria-hidden />
            Πτήση ξανά
          </button>
        )}
        <span
          aria-hidden
          className="bg-black/45 px-2.5 py-1.5 text-[11px] font-medium tabular-nums text-white/90 backdrop-blur-md"
        >
          Υψόμετρο <span ref={altitudeRef}>—</span>
        </span>
      </div>
    </div>
  );
}
