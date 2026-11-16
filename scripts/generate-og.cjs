const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOgImage() {
  const tigerPath = path.join(__dirname, '../src/assets/tiger.png');
  const tigerB64 = fs.readFileSync(tigerPath).toString('base64');
  const outputPath = path.join(__dirname, '../public/og-image.png');

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="60%" stop-color="#0e0e11"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>

    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111114"/>
      <stop offset="100%" stop-color="#0c0c0e"/>
    </linearGradient>

    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>

    <radialGradient id="tigerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ea580c" stop-opacity="0.18"/>
      <stop offset="70%" stop-color="#ea580c" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="cornerGlow" cx="0%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Deep Canvas Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Card Frame -->
  <rect x="40" y="38" width="1120" height="554" rx="20" fill="url(#cardBg)" stroke="#262626" stroke-width="1.5"/>
  <rect x="40" y="38" width="1120" height="554" rx="20" fill="url(#cornerGlow)"/>

  <!-- Warm ambient glow around the tiger & headline -->
  <circle cx="730" cy="270" r="320" fill="url(#tigerGlow)"/>

  <!-- Top Metadata / Identity Bar -->
  <g transform="translate(85, 96)">
    <text font-family="'DejaVu Sans', 'Liberation Sans', -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="3.5" fill="#f5f5f5">NUKALA ABHIRAM</text>
    <circle cx="184" cy="-4" r="2.5" fill="#525252"/>
    <text x="198" y="0" font-family="'DejaVu Serif', 'Liberation Serif', Georgia, serif" font-style="italic" font-size="16" fill="#a3a3a3">Software Engineer</text>
    <circle cx="362" cy="-4" r="2.5" fill="#525252"/>
    <text x="376" y="0" font-family="'DejaVu Sans', 'Liberation Sans', -apple-system, sans-serif" font-size="13" font-weight="500" fill="#737373">Hyderabad, IN</text>
  </g>

  <!-- Tiger Mascot Emblem behind 'Native' -->
  <g transform="translate(680, 230) rotate(10) scale(1.75)">
    <!-- Tiger soft shadow -->
    <image href="data:image/png;base64,${tigerB64}" x="-115" y="-80" width="231" height="161" opacity="0.9" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.9))"/>
  </g>

  <!-- Editorial Headline -->
  <!-- Line 1: Engineering React & -->
  <text x="85" y="215" font-family="'DejaVu Serif', 'Liberation Serif', Georgia, serif" font-size="64" font-weight="normal" fill="#ffffff" letter-spacing="-1">
    Engineering <tspan font-style="italic" fill="url(#orangeGradient)">React</tspan> &amp;
  </text>

  <!-- Line 2: React Native experiences -->
  <text x="85" y="295" font-family="'DejaVu Serif', 'Liberation Serif', Georgia, serif" font-size="64" font-weight="normal" fill="#ffffff" letter-spacing="-1">
    <tspan font-style="italic" fill="url(#orangeGradient)">React</tspan> <tspan font-style="italic" fill="url(#orangeGradient)">Native</tspan> experiences
  </text>

  <!-- Line 3: that ship and scale. -->
  <text x="85" y="375" font-family="'DejaVu Serif', 'Liberation Serif', Georgia, serif" font-size="64" font-weight="normal" fill="#ffffff" letter-spacing="-1">
    that ship and scale.
  </text>

  <!-- Narrative Summary -->
  <g transform="translate(85, 435)">
    <text font-family="'DejaVu Sans', 'Liberation Sans', -apple-system, sans-serif" font-size="18.5" fill="#a3a3a3" letter-spacing="-0.2">
      <tspan x="0" dy="0">Software engineer with 2.7 years building production React.js web apps</tspan>
      <tspan x="0" dy="28">and React Native mobile apps, plus native C++ Nitro Modules with JSI.</tspan>
    </text>
  </g>

  <!-- Hairline divider inside card -->
  <line x1="85" y1="508" x2="1115" y2="508" stroke="#262626" stroke-width="1.2"/>

  <!-- Card Footer -->
  <g transform="translate(85, 545)">
    <!-- Site URL -->
    <text font-family="'DejaVu Sans', 'Liberation Sans', -apple-system, sans-serif" font-size="15" font-weight="600" fill="#f97316" letter-spacing="0.2">
      abhiramnukala.netlify.app
    </text>

    <!-- Stack Pills -->
    <text x="600" y="0" font-family="'DejaVu Sans', 'Liberation Sans', -apple-system, sans-serif" font-size="13.5" fill="#737373" letter-spacing="0.5">
      <tspan fill="#d4d4d4" font-weight="500">React Native</tspan>
      <tspan dx="8" fill="#525252">•</tspan>
      <tspan dx="8" fill="#d4d4d4" font-weight="500">React</tspan>
      <tspan dx="8" fill="#525252">•</tspan>
      <tspan dx="8" fill="#d4d4d4" font-weight="500">TypeScript</tspan>
      <tspan dx="8" fill="#525252">•</tspan>
      <tspan dx="8" fill="#d4d4d4" font-weight="500">C++ / JSI</tspan>
      <tspan dx="8" fill="#525252">•</tspan>
      <tspan dx="8" fill="#d4d4d4" font-weight="500">Expo</tspan>
    </text>
  </g>
</svg>
`;

  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outputPath);

  console.log(`Successfully generated OG image: ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
