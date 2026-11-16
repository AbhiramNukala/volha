const fs = require('fs');
const path = require('path');

// Ensure fontconfig uses the local fonts
process.env.FONTCONFIG_FILE = path.resolve(__dirname, 'fonts.conf');

const sharp = require('sharp');

// Helper to generate regular hexagon path centered at (cx, cy) with radius r
function getHexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

// Generate a grid of hexagons across a 1200x630 canvas
function generateHexGrid({ r = 10, spacingX = 38, spacingY = 34, stroke = '#e5e7eb', highlightProb = 0.04 }) {
  const hexPaths = [];
  const highlights = [];

  let row = 0;
  for (let y = 30; y <= 600; y += spacingY) {
    const offsetX = (row % 2 === 1) ? spacingX / 2 : 0;
    for (let x = 30 + offsetX; x <= 1170; x += spacingX) {
      hexPaths.push(getHexPath(x, y, r));

      const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const pseudo = rand - Math.floor(rand);
      if (pseudo < highlightProb && (x > 550 || y > 380)) {
        highlights.push(`<path d="${getHexPath(x, y, r)}" fill="#ea580c" fill-opacity="0.14" stroke="#ea580c" stroke-opacity="0.38" stroke-width="1.2"/>`);
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

async function generateOgImage() {
  const tigerPath = path.resolve(__dirname, '../src/assets/tiger.webp');
  let tigerB64 = '';
  if (fs.existsSync(tigerPath)) {
    tigerB64 = fs.readFileSync(tigerPath).toString('base64');
  }

  const outputPngPath = path.resolve(__dirname, '../public/og-image.png');
  const outputWebpPath = path.resolve(__dirname, '../public/og-image.webp');

  const hexGrid = generateHexGrid({ r: 10, spacingX: 38, spacingY: 34, stroke: '#e5e7eb', highlightProb: 0.04 });

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Soft vignette behind main text for clean contrast -->
    <radialGradient id="textFade" cx="28%" cy="45%" r="62%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>

  <!-- Clean White Background -->
  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- Outer Card Frame (matching sketch) -->
  <rect x="36" y="34" width="1128" height="562" rx="20" fill="#ffffff" stroke="#18181b" stroke-width="2.5"/>

  <!-- Hexagon Grid from start to end -->
  <g clip-path="url(#cardClip)">
    <clipPath id="cardClip">
      <rect x="38" y="36" width="1124" height="558" rx="18"/>
    </clipPath>
    ${hexGrid}
  </g>

  <!-- Subtle fade behind text -->
  <rect x="40" y="38" width="850" height="500" fill="url(#textFade)" opacity="0.78" pointer-events="none"/>

  <!-- Top Metadata Bar -->
  <g transform="translate(85, 96)">
    <circle cx="0" cy="-4" r="4.5" fill="#ea580c"/>
    <text x="14" y="0" font-family="'DejaVu Sans', -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="#71717a">SOFTWARE ENGINEER</text>
    <circle cx="215" cy="-4" r="2.5" fill="#a1a1aa"/>
    <text x="228" y="0" font-family="'DejaVu Sans', -apple-system, sans-serif" font-size="13" font-weight="500" fill="#a1a1aa">Hyderabad, IN</text>
  </g>

  <!-- Staggered Names in Instrument Serif: Abhiram on top, Nukala from 'ram' -->
  <g transform="translate(85, 215)">
    <text font-family="'Instrument Serif', Georgia, serif" font-size="108" font-weight="normal" fill="#09090b" letter-spacing="-1.5">
      Abhiram
    </text>
  </g>

  <!-- Nukala aligned right under 'ram' -->
  <g transform="translate(340, 315)">
    <circle cx="-18" cy="-28" r="4" fill="#ea580c"/>
    <text font-family="'Instrument Serif', Georgia, serif" font-size="108" font-weight="normal" fill="url(#orangeGrad)" letter-spacing="-1.5">
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
    <text font-family="'DejaVu Sans', -apple-system, sans-serif" font-size="16" font-weight="500" fill="#52525b" letter-spacing="0.2">
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
    <text font-family="'DejaVu Sans', -apple-system, sans-serif" font-size="14" font-weight="600" fill="#ea580c" letter-spacing="0.5">
      abhiramnukala.netlify.app
    </text>
  </g>

  <!-- Tiger emblem on right -->
  ${tigerB64 ? `
  <g transform="translate(1030, 535) scale(0.9)">
    <image href="data:image/webp;base64,${tigerB64}" x="-40" y="-35" width="80" height="55" opacity="0.95"/>
  </g>` : ''}
</svg>
`;

  const svgBuffer = Buffer.from(svg);

  await Promise.all([
    sharp(svgBuffer)
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(outputPngPath),
    sharp(svgBuffer)
      .webp({ quality: 90 })
      .toFile(outputWebpPath),
  ]);

  console.log(`Successfully generated OG images: ${outputPngPath} & ${outputWebpPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
