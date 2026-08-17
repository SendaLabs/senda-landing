import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const geo = JSON.parse(
  readFileSync(join(root, "scripts", "data", "world.geojson"), "utf8"),
);

const LATAM = new Set([
  "Mexico",
  "Belize",
  "Guatemala",
  "El Salvador",
  "Honduras",
  "Nicaragua",
  "Costa Rica",
  "Panama",
  "Colombia",
  "Venezuela",
  "Guyana",
  "Suriname",
  "French Guiana",
  "Ecuador",
  "Peru",
  "Brazil",
  "Bolivia",
  "Paraguay",
  "Uruguay",
  "Argentina",
  "Chile",
  "Cuba",
  "Haiti",
  "Dominican Republic",
  "Jamaica",
  "Trinidad and Tobago",
  "Puerto Rico",
]);

const WIDTH = 420;
const HEIGHT = 520;
const PAD = 18;

function ringsOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates[0]];
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.map((poly) => poly[0]);
  }
  return [];
}

function ringArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    area += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(area / 2);
}

const FRENCH_GUIANA = [
  [-54.5248, 2.3118],
  [-54.0881, 2.1056],
  [-53.7785, 2.3767],
  [-53.5548, 2.3349],
  [-53.4185, 2.0534],
  [-52.9397, 2.1249],
  [-52.5564, 2.5047],
  [-52.2493, 3.2411],
  [-51.6578, 4.1562],
  [-51.55, 4.55],
  [-52.05, 5.45],
  [-52.65, 5.75],
  [-53.2, 5.78],
  [-53.9, 5.65],
  [-54.25, 5.15],
  [-54.45, 4.35],
  [-54.5248, 2.3118],
];

const features = [
  ...geo.features.filter((f) => LATAM.has(f.properties.name)),
  {
    properties: { name: "French Guiana" },
    geometry: { type: "Polygon", coordinates: [FRENCH_GUIANA] },
  },
];
const found = features.map((f) => f.properties.name).sort();
const missing = [...LATAM].filter((n) => !found.includes(n));

const allRings = [];
for (const feature of features) {
  for (const ring of ringsOf(feature.geometry)) {
    if (ringArea(ring) < 0.04) continue;
    allRings.push({ name: feature.properties.name, ring });
  }
}

let minLon = Infinity;
let minLat = Infinity;
let maxLon = -Infinity;
let maxLat = -Infinity;
for (const { ring } of allRings) {
  for (const [lon, lat] of ring) {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
}

const lonSpan = maxLon - minLon;
const latSpan = maxLat - minLat;
const scale = Math.min(
  (WIDTH - PAD * 2) / lonSpan,
  (HEIGHT - PAD * 2) / latSpan,
);
const offsetX = (WIDTH - lonSpan * scale) / 2;
const offsetY = (HEIGHT - latSpan * scale) / 2;

function project(lon, lat) {
  return [
    offsetX + (lon - minLon) * scale,
    offsetY + (maxLat - lat) * scale,
  ];
}

function pathFromRing(ring) {
  return (
    ring
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}

function largestRing(name) {
  return allRings
    .filter((r) => r.name === name)
    .sort((a, b) => ringArea(b.ring) - ringArea(a.ring))[0];
}

function centroid(ring) {
  let sx = 0;
  let sy = 0;
  const pts = ring.slice(0, -1);
  for (const [lon, lat] of pts) {
    sx += lon;
    sy += lat;
  }
  return [sx / pts.length, sy / pts.length];
}

const cr = largestRing("Costa Rica");
const ar = largestRing("Argentina");
const [crLon, crLat] = centroid(cr.ring);
const [arLon, arLat] = centroid(ar.ring);
const [crX, crY] = project(crLon, crLat);
const [arX, arY] = project(arLon, arLat);

const paths = allRings
  .map(({ ring }) => `<path d="${pathFromRing(ring)}" />`)
  .join("\n    ");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" stroke="#F4F1E8" stroke-width="1.35" stroke-linejoin="round" stroke-linecap="round">
  <g>
    ${paths}
  </g>
</svg>
`;

mkdirSync(join(root, "public", "maps"), { recursive: true });
writeFileSync(join(root, "public", "maps", "latin-america.svg"), svg);

const meta = {
  viewBox: [WIDTH, HEIGHT],
  costaRica: { x: crX, y: crY, pct: { x: (crX / WIDTH) * 100, y: (crY / HEIGHT) * 100 } },
  argentina: { x: arX, y: arY, pct: { x: (arX / WIDTH) * 100, y: (arY / HEIGHT) * 100 } },
  found,
  missing,
};

console.log(JSON.stringify(meta, null, 2));
console.log(`paths: ${allRings.length}`);
console.log(`svg bytes: ${svg.length}`);
