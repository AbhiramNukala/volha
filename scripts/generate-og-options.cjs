const fs = require('fs');
const path = require('path');

// Ensure fontconfig uses the local fonts
process.env.FONTCONFIG_FILE = path.resolve(__dirname, 'fonts.conf');

const sharp = require('sharp');

// Tiger base64 for embedding if needed
const tigerPath = path.resolve(__dirname, '../src/assets/tiger.webp');
let tigerB64 = '';
if (fs.existsSync(tigerPath)) {
  tigerB64 = fs.readFileSync(tigerPath).toString('base64');
}

// Helper to generate regular hexagon path centered at (cx, cy) with radius r
function getHexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    // Pointy-topped hexagon
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

// Generate a grid of hexagons across a 1200x630 canvas
function generateHexGrid({ r = 11, spacingX = 36, spacingY = 32, stroke = '#e4e4e7', highlightProb = 0.03 }) {
  let hexPaths = [];
  let highlights = [];

  let row = 0;
  for (let y = 30; y <= 600; y += spacingY) {
    const offsetX = (row % 2 === 1) ? spacingX / 2 : 0;
    for (let x = 30 + offsetX; x <= 1170; x += spacingX) {
      hexPaths.push(getHexPath(x, y, r));

      // Occasional faint orange highlight hexagon
      const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const pseudo = rand - Math.floor(rand);
      if (pseudo < highlightProb && (x > 600 || y > 400)) {
        highlights.push(`<path d="${getHexPath(x, y, r)}" fill="#ea580c" fill-opacity="0.12" stroke="#ea580c" stroke-opacity="0.35" stroke-width="1.2"/>`);
      }
    }
    row++;
  }

  return `
    <g stroke="${stroke}" stroke-width="1" fill="none" opacity="0.85">
      <path d="${hexPaths.join(' ')}" />
    </g>
    <g>
      ${highlights.join('\n')}
    </g>
  `;
}

// OPTION 1: "Editorial Signature"
// Clean white canvas, solid dark border, staggered Abhiram / Nukala, prominent React & React Native, skill pills
function renderOption1() {
  const hexGrid = generateHexGrid({ r: 10, spacingX: 38, spacingY: 34, stroke: '#e5e7eb', highlightProb: 0.04 });

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Radial mask to softly fade hexagons behind main text -->
    <radialGradient id="textFade1" cx="30%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="orangeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>

  <!-- Clean White Canvas -->
  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- Outer Card Frame (matching sketch) -->
  <rect x="36" y="34" width="1128" height="562" rx="20" fill="#ffffff" stroke="#18181b" stroke-width="2.5"/>

  <!-- Hexagon Grid from start to end -->
  <g clip-path="url(#cardClip1)">
    <clipPath id="cardClip1">
      <rect x="38" y="36" width="1124" height="558" rx="18"/>
    </clipPath>
    ${hexGrid}
  </g>

  <!-- Soft vignette behind main headline to ensure 100% crisp contrast -->
  <rect x="40" y="38" width="850" height="500" fill="url(#textFade1)" opacity="0.75" pointer-events="none"/>

  <!-- Top Metadata Bar -->
  <g transform="translate(85, 96)">
    <circle cx="0" cy="-4" r="4.5" fill="#ea580c"/>
    <text x="14" y="0" font-family="'DejaVu Sans', sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="#71717a">SOFTWARE ENGINEER</text>
    <circle cx="215" cy="-4" r="2.5" fill="#a1a1aa"/>
    <text x="228" y="0" font-family="'DejaVu Sans', sans-serif" font-size="13" font-weight="500" fill="#a1a1aa">Hyderabad, IN</text>
  </g>

  <!-- Staggered Names: Abhiram on top, Nukala starting from 'ram' -->
  <!-- 'Abhiram': font-size 106px -->
  <g transform="translate(85, 215)">
    <text font-family="'Instrument Serif', Georgia, serif" font-size="108" font-weight="normal" fill="#09090b" letter-spacing="-1.5">
      Abhiram
    </text>
  </g>

  <!-- 'Nukala': shifted right to align with 'ram' (offset ~265px) -->
  <g transform="translate(340, 315)">
    <!-- subtle dot before Nukala as sketched -->
    <circle cx="-18" cy="-28" r="4" fill="#ea580c"/>
    <text font-family="'Instrument Serif', Georgia, serif" font-size="108" font-weight="normal" fill="url(#orangeGrad1)" letter-spacing="-1.5">
      Nukala
    </text>
  </g>

  <!-- Subtitle: React & React native dev -->
  <g transform="translate(85, 400)">
    <text font-family="'Instrument Serif', Georgia, serif" font-style="italic" font-size="44" fill="#18181b" letter-spacing="-0.5">
      React &amp; React Native <tspan font-style="normal" fill="#ea580c">Engineer</tspan>
    </text>
  </g>

  <!-- Tech tags line: c/cpp, java, ts, js, and many more -->
  <g transform="translate(85, 465)">
    <text font-family="'DejaVu Sans', sans-serif" font-size="16" font-weight="500" fill="#52525b" letter-spacing="0.2">
      <tspan fill="#ea580c" font-weight="600">C / C++</tspan>
      <tspan fill="#a1a1aa">  •  </tspan>
      <tspan fill="#18181b">TypeScript</tspan>
      <tspan fill="#a1a1aa">  •  </tspan>
      <tspan fill="#18181b">Java</tspan>
      <tspan fill="#a1a1aa">  •  </tspan>
      <tspan fill="#18181b">JavaScript</tspan>
      <tspan fill="#a1a1aa">  •  </tspan>
      <tspan fill="#18181b">JSI / Nitro Modules</tspan>
      <tspan fill="#a1a1aa">  •  </tspan>
      <tspan fill="#18181b">Expo</tspan>
    </text>
  </g>

  <!-- Hairline divider inside card -->
  <line x1="85" y1="510" x2="1115" y2="510" stroke="#e4e4e7" stroke-width="1.5" stroke-dasharray="4 4"/>

  <!-- Footer Info -->
  <g transform="translate(85, 550)">
    <text font-family="'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#ea580c" letter-spacing="0.5">
      abhiramnukala.netlify.app
    </text>
  </g>

  <!-- Mascot emblem on right -->
  <g transform="translate(1030, 535) scale(0.9)">
    <image href="data:image/webp;base64,${tigerB64}" x="-40" y="-35" width="80" height="55" opacity="0.95"/>
  </g>
</svg>
`;
}

// OPTION 2: "Pure Sketch Minimal" (Close interpretation with hand-drawn spirit & modern elegance)
function renderOption2() {
  const hexGrid = generateHexGrid({ r: 9, spacingX: 34, spacingY: 30, stroke: '#e2e8f0', highlightProb: 0.05 });

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="centerGlow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff7ed" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#fafafa"/>

  <!-- Outer frame as in sketch -->
  <rect x="34" y="32" width="1132" height="566" rx="24" fill="#ffffff" stroke="#09090b" stroke-width="3"/>

  <!-- Background hexagons across entire card -->
  <g clip-path="url(#cardClip2)">
    <clipPath id="cardClip2">
      <rect x="36" y="34" width="1128" height="562" rx="22"/>
    </clipPath>
    ${hexGrid}
  </g>

  <!-- Warm ambient light -->
  <circle cx="500" cy="300" r="400" fill="url(#centerGlow2)" pointer-events="none"/>

  <!-- Large Staggered Name -->
  <g transform="translate(95, 195)">
    <!-- 'Abhiram' in Instrument Serif -->
    <text font-family="'Instrument Serif', Georgia, serif" font-size="118" font-weight="normal" fill="#09090b" letter-spacing="-2">
      Abhiram
    </text>
  </g>

  <g transform="translate(370, 305)">
    <!-- Accent Dot right before Nukala -->
    <circle cx="-22" cy="-30" r="5" fill="#ea580c"/>
    <!-- 'Nukala' in Instrument Serif -->
    <text font-family="'Instrument Serif', Georgia, serif" font-size="118" font-weight="normal" fill="#ea580c" letter-spacing="-2">
      Nukala
    </text>
  </g>

  <!-- Center-aligned 'React & React native dev' exactly as in user sketch -->
  <g transform="translate(370, 410)">
    <text font-family="'Instrument Serif', Georgia, serif" font-style="italic" font-size="52" fill="#18181b" letter-spacing="-0.5">
      React &amp; React Native <tspan font-style="normal" font-family="'DejaVu Sans', sans-serif" font-size="34" font-weight="600" fill="#ea580c">dev</tspan>
    </text>
  </g>

  <!-- Lower-right aligned skills line as sketched -->
  <g transform="translate(620, 500)">
    <rect x="-16" y="-30" width="470" height="46" rx="8" fill="#ffffff" stroke="#e4e4e7" stroke-width="1.2" opacity="0.95"/>
    <text x="0" y="0" font-family="'DejaVu Sans', sans-serif" font-size="15" font-weight="500" fill="#52525b" letter-spacing="0.2">
      <tspan fill="#ea580c" font-weight="600">c/cpp</tspan>, java, ts, js, and many more
    </text>
  </g>

  <!-- URL at bottom left -->
  <g transform="translate(95, 550)">
    <text font-family="'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#a1a1aa" letter-spacing="1">
      ABHIRAMNUKALA.NETLIFY.APP
    </text>
  </g>
</svg>
`;
}

// OPTION 3: "Modern Blueprint / High-Density Matrix"
// Sophisticated technical badge, crisp dual-tone typography, floating code pill
function renderOption3() {
  const hexGrid = generateHexGrid({ r: 12, spacingX: 42, spacingY: 36, stroke: '#d4d4d8', highlightProb: 0.06 });

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fafafa"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#f4f4f5"/>

  <!-- Card with crisp shadow effect -->
  <rect x="36" y="34" width="1128" height="562" rx="20" fill="url(#cardGrad3)" stroke="#18181b" stroke-width="2"/>

  <!-- Full Hexagon Matrix -->
  <g clip-path="url(#cardClip3)">
    <clipPath id="cardClip3">
      <rect x="38" y="36" width="1124" height="558" rx="18"/>
    </clipPath>
    ${hexGrid}
  </g>

  <!-- White shield card behind text for maximum clarity -->
  <rect x="70" y="70" width="760" height="480" rx="16" fill="#ffffff" fill-opacity="0.94" stroke="#e4e4e7" stroke-width="1.2"/>

  <!-- Status / Pill -->
  <g transform="translate(105, 125)">
    <rect x="0" y="-18" width="180" height="30" rx="15" fill="#fff7ed" stroke="#fdba74" stroke-width="1"/>
    <circle cx="15" cy="-3" r="3.5" fill="#ea580c"/>
    <text x="28" y="1" font-family="'DejaVu Sans', sans-serif" font-size="11.5" font-weight="700" letter-spacing="1" fill="#c2410c">OPEN SOURCE DEV</text>
  </g>

  <!-- Staggered Headline in Instrument Serif -->
  <g transform="translate(105, 235)">
    <text font-family="'Instrument Serif', Georgia, serif" font-size="98" font-weight="normal" fill="#09090b" letter-spacing="-1">
      Abhiram
    </text>
  </g>

  <g transform="translate(330, 325)">
    <circle cx="-16" cy="-25" r="4" fill="#ea580c"/>
    <text font-family="'Instrument Serif', Georgia, serif" font-size="98" font-weight="normal" fill="#ea580c" letter-spacing="-1">
      Nukala
    </text>
  </g>

  <!-- Role Subtitle -->
  <g transform="translate(105, 405)">
    <text font-family="'Instrument Serif', Georgia, serif" font-style="italic" font-size="42" fill="#27272a">
      React &amp; React Native Developer
    </text>
  </g>

  <!-- Stack Pills inside card -->
  <g transform="translate(105, 470)">
    <text font-family="'DejaVu Sans', sans-serif" font-size="14.5" font-weight="500" fill="#52525b">
      <tspan fill="#ea580c" font-weight="600">C++ / JSI</tspan>
      <tspan fill="#a1a1aa">  |  </tspan>
      <tspan fill="#18181b">TypeScript</tspan>
      <tspan fill="#a1a1aa">  |  </tspan>
      <tspan fill="#18181b">Java</tspan>
      <tspan fill="#a1a1aa">  |  </tspan>
      <tspan fill="#18181b">Nitro Modules</tspan>
      <tspan fill="#a1a1aa">  |  </tspan>
      <tspan fill="#18181b">Expo</tspan>
    </text>
  </g>

  <!-- Floating Right Panel: Code Card -->
  <g transform="translate(860, 220)">
    <rect width="260" height="180" rx="12" fill="#18181b" stroke="#27272a" stroke-width="1.5"/>
    <circle cx="22" cy="22" r="4" fill="#ef4444"/>
    <circle cx="36" cy="22" r="4" fill="#eab308"/>
    <circle cx="50" cy="22" r="4" fill="#22c55e"/>

    <text x="20" y="65" font-family="'DejaVu Sans Mono', monospace" font-size="12" fill="#a1a1aa">$ npm i rn-udpb</text>
    <text x="20" y="95" font-family="'DejaVu Sans Mono', monospace" font-size="11" fill="#ea580c">✓ Nitro Module JSI</text>
    <text x="20" y="120" font-family="'DejaVu Sans Mono', monospace" font-size="11" fill="#71717a">  iOS + Android</text>
    <text x="20" y="145" font-family="'DejaVu Sans Mono', monospace" font-size="11" fill="#22c55e">✓ Zero-bridge latency</text>
  </g>

  <!-- URL at bottom right -->
  <g transform="translate(860, 545)">
    <text font-family="'DejaVu Sans', sans-serif" font-size="13" font-weight="600" fill="#ea580c" letter-spacing="0.5">
      abhiramnukala.netlify.app
    </text>
  </g>
</svg>
`;
}

async function run() {
  const outDir = path.resolve(__dirname, '../public/og-options');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const options = [
    { name: 'option-1-editorial', fn: renderOption1 },
    { name: 'option-2-sketch-minimal', fn: renderOption2 },
    { name: 'option-3-blueprint', fn: renderOption3 },
  ];

  for (const opt of options) {
    const svg = opt.fn();
    const svgBuf = Buffer.from(svg);
    const pngPath = path.join(outDir, `${opt.name}.png`);
    const webpPath = path.join(outDir, `${opt.name}.webp`);

    await Promise.all([
      sharp(svgBuf).png({ quality: 95 }).toFile(pngPath),
      sharp(svgBuf).webp({ quality: 92 }).toFile(webpPath),
    ]);

    console.log(`Generated: ${opt.name} -> PNG & WebP`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
