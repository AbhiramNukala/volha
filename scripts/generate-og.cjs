const fs = require('fs');
const path = require('path');

// Ensure fontconfig resolves Instrument Serif, JetBrains Mono, and Inter
process.env.FONTCONFIG_FILE = path.resolve(__dirname, 'fonts.conf');

const sharp = require('sharp');

// Calculate dynamic experience duration from May 2024
function getDynamicExpText() {
  const start = new Date(2024, 4, 1);
  const now = new Date();
  const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const years = Math.floor(diffMonths / 12);
  const half = (diffMonths % 12) >= 6 ? '.5+' : '+';
  return `${years}${half} Years Exp`;
}

// Render die-cut sticker with soft physical drop shadow
async function renderStickerWithShadow(imagePath, { width, alpha = 0.28, blur = 7, shadowOffsetY = 8, pad = 24, rotate = 0 } = {}) {
  let pipeline = sharp(imagePath).resize({ width });
  if (rotate !== 0) {
    pipeline = pipeline.rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }
  const resized = await pipeline.png().toBuffer();
  const meta = await sharp(resized).metadata();

  const darkRect = await sharp({
    create: {
      width: meta.width,
      height: meta.height,
      channels: 4,
      background: { r: 28, g: 25, b: 23, alpha }
    }
  }).png().toBuffer();

  const silhouette = await sharp(darkRect)
    .composite([{ input: resized, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const shadow = await sharp(silhouette)
    .extend({
      top: pad,
      bottom: pad + shadowOffsetY,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .blur(blur)
    .png()
    .toBuffer();

  const stickerWithShadow = await sharp(shadow)
    .composite([{ input: resized, top: pad, left: pad }])
    .png()
    .toBuffer();

  const finalMeta = await sharp(stickerWithShadow).metadata();
  return {
    buffer: stickerWithShadow,
    width: finalMeta.width,
    height: finalMeta.height,
    pad,
  };
}

async function generateOgImage() {
  const rootDir = path.resolve(__dirname, '..');
  const outputPngPath = path.resolve(rootDir, 'public/og-image.png');
  const outputWebpPath = path.resolve(rootDir, 'public/og-image.webp');
  const outputBannerPngPath = path.resolve(rootDir, 'public/banner.png');

  const einsteinPath = path.resolve(rootDir, 'src/assets/stickers/einstein.webp');
  const tigerPath = path.resolve(rootDir, 'src/assets/stickers/tiger.webp');
  const cloverPath = path.resolve(rootDir, 'src/assets/stickers/clover.webp');

  // Render stickers with realistic drop shadows
  const [einstein, tiger, clover] = await Promise.all([
    renderStickerWithShadow(einsteinPath, { width: 195, alpha: 0.30, blur: 8, shadowOffsetY: 8 }),
    renderStickerWithShadow(tigerPath, { width: 108, alpha: 0.28, blur: 6, shadowOffsetY: 6, rotate: 2 }),
    renderStickerWithShadow(cloverPath, { width: 46, alpha: 0.22, blur: 4, shadowOffsetY: 3, rotate: -3 }),
  ]);

  const expText = getDynamicExpText();

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Warm cozy outer background -->
    <linearGradient id="warmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf8f5"/>
      <stop offset="50%" stop-color="#f7f4ed"/>
      <stop offset="100%" stop-color="#f3efe6"/>
    </linearGradient>

    <!-- Warm crisp card background -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fdfcf9"/>
    </linearGradient>

    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>

    <!-- Dot texture pattern -->
    <pattern id="dotPattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.1" fill="#e7e0d4" opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Canvas Outer Background -->
  <rect width="1200" height="630" fill="url(#warmBg)"/>

  <!-- Subtle corner crosshairs on outer canvas -->
  <g stroke="#d3ccbe" stroke-width="1.2" opacity="0.7">
    <line x1="18" y1="18" x2="28" y2="18"/>
    <line x1="18" y1="18" x2="18" y2="28"/>
    <line x1="1182" y1="18" x2="1172" y2="18"/>
    <line x1="1182" y1="18" x2="1182" y2="28"/>
    <line x1="18" y1="612" x2="28" y2="612"/>
    <line x1="18" y1="612" x2="18" y2="602"/>
    <line x1="1182" y1="612" x2="1172" y2="612"/>
    <line x1="1182" y1="612" x2="1182" y2="602"/>
  </g>

  <!-- Editorial Inner Card Frame -->
  <rect x="36" y="34" width="1128" height="562" rx="20" fill="url(#cardGrad)" stroke="#e4ded3" stroke-width="1.5"/>

  <!-- Subtle dot texture inside the frame -->
  <rect x="38" y="36" width="1124" height="558" rx="18" fill="url(#dotPattern)"/>

  <!-- Delicate hairline accent border inside card -->
  <rect x="48" y="46" width="1104" height="538" rx="14" fill="none" stroke="#f0ece2" stroke-width="1"/>

  <!-- ==================== LEFT COLUMN: TYPOGRAPHY & IDENTITY ==================== -->

  <!-- Top Metadata Bar -->
  <g transform="translate(85, 96)">
    <!-- Pill Badge for Nukala Abhiram -->
    <rect x="-12" y="-18" width="220" height="32" rx="16" fill="#f5f1eb" stroke="#e6dfd3" stroke-width="1"/>
    <circle cx="4" cy="-2" r="4.5" fill="#ea580c"/>
    <text x="18" y="2.5" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2.2" fill="#292524">NUKALA ABHIRAM</text>

    <!-- Role Divider & Text -->
    <circle cx="230" cy="-2" r="2.5" fill="#a8a29e"/>
    <text x="245" y="2.5" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" letter-spacing="1.5" fill="#78716c">SOFTWARE ENGINEER</text>

    <!-- Location & Status -->
    <circle cx="435" cy="-2" r="2.5" fill="#d6d1c7"/>
    <text x="450" y="2.5" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" letter-spacing="1" fill="#a8a29e">HYDERABAD, IN</text>
  </g>

  <!-- Main Headline in Instrument Serif (2 balanced lines) -->
  <g transform="translate(85, 202)">
    <text font-family="'Instrument Serif', Georgia, serif" font-size="50" font-weight="normal" fill="#1c1917" letter-spacing="-0.5">
      Building <tspan font-style="italic" fill="url(#orangeGrad)">React.js</tspan> web apps &amp;
    </text>
    <text y="68" font-family="'Instrument Serif', Georgia, serif" font-size="50" font-weight="normal" fill="#1c1917" letter-spacing="-0.5">
      <tspan font-style="italic" fill="url(#orangeGrad)">React Native</tspan> mobile systems.
    </text>
  </g>

  <!-- Minimal, Cozy Summary (2 clean lines, zero clutter) -->
  <g transform="translate(85, 340)">
    <text font-family="'Inter', -apple-system, sans-serif" font-size="17" font-weight="400" fill="#57534e" letter-spacing="0.1">
      Focused on production frontend systems, mobile architecture &amp; native performance.
    </text>
    <text y="26" font-family="'Inter', -apple-system, sans-serif" font-size="17" font-weight="400" fill="#78716c" letter-spacing="0.1">
      Specialized in TypeScript, C++ / JSI Nitro Modules &amp; cross-platform UX.
    </text>
  </g>

  <!-- Tech Stack Pills -->
  <g transform="translate(85, 428)">
    <!-- Tag 1: React.js -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="86" height="30" rx="8" fill="#f5f2ed" stroke="#e4ded3" stroke-width="1"/>
      <text x="43" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#292524" text-anchor="middle">React.js</text>
    </g>
    <!-- Tag 2: React Native -->
    <g transform="translate(96, 0)">
      <rect x="0" y="0" width="122" height="30" rx="8" fill="#f5f2ed" stroke="#e4ded3" stroke-width="1"/>
      <text x="61" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#292524" text-anchor="middle">React Native</text>
    </g>
    <!-- Tag 3: TypeScript -->
    <g transform="translate(228, 0)">
      <rect x="0" y="0" width="105" height="30" rx="8" fill="#f5f2ed" stroke="#e4ded3" stroke-width="1"/>
      <text x="52.5" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#292524" text-anchor="middle">TypeScript</text>
    </g>
    <!-- Tag 4: C++ / JSI -->
    <g transform="translate(343, 0)">
      <rect x="0" y="0" width="96" height="30" rx="8" fill="#fff7ed" stroke="#fed7aa" stroke-width="1"/>
      <text x="48" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#ea580c" text-anchor="middle">C++ / JSI</text>
    </g>
    <!-- Tag 5: Expo -->
    <g transform="translate(449, 0)">
      <rect x="0" y="0" width="68" height="30" rx="8" fill="#f5f2ed" stroke="#e4ded3" stroke-width="1"/>
      <text x="34" y="19" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#292524" text-anchor="middle">Expo</text>
    </g>
  </g>

  <!-- Hairline divider inside card -->
  <line x1="85" y1="492" x2="1115" y2="492" stroke="#e6e1d6" stroke-width="1.2" stroke-dasharray="3 3"/>

  <!-- Footer Info Line -->
  <g transform="translate(85, 538)">
    <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ea580c" letter-spacing="0.5">
      abhiramnukala.netlify.app
    </text>
    <text x="245" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#a8a29e">
      ·  ${expText}  ·  Open Source Nitro Module Author
    </text>
  </g>

  <!-- ==================== RIGHT COLUMN: EINSTEIN & STICKER BOARD ==================== -->

  <!-- Vertical subtle guide line separating left column and right visual -->
  <line x1="790" y1="80" x2="790" y2="470" stroke="#eeeae1" stroke-width="1"/>

  <!-- Quote Container card (cozy editorial paper note) -->
  <g transform="translate(815, 335)">
    <rect x="0" y="0" width="310" height="98" rx="10" fill="#faf8f4" stroke="#e8e2d6" stroke-width="1"/>
    <text x="16" y="28" font-family="'JetBrains Mono', monospace" font-style="italic" font-size="11.5" fill="#292524" letter-spacing="-0.2">
      “If your code compiles on the first try,
    </text>
    <text x="16" y="48" font-family="'JetBrains Mono', monospace" font-style="italic" font-size="11.5" fill="#292524" letter-spacing="-0.2">
      don’t celebrate. Something is deeply wrong.”
    </text>
    <text x="294" y="80" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ea580c" letter-spacing="1.5" text-anchor="end">
      — THEORY OF RELATIVE DEBUGGING
    </text>
  </g>

</svg>
`;

  const svgBuffer = Buffer.from(svg);

  // Position Einstein centered above the quote box (quote center is 815 + 155 = 970)
  const einsteinLeft = Math.round(970 - (einstein.width / 2));
  const einsteinTop = 82;

  // Position Tiger in bottom right corner (beside/under the quote)
  const tigerLeft = 995;
  const tigerTop = 452;

  // Position Clover near top right of left column
  const cloverLeft = 762;
  const cloverTop = 80;

  const baseImage = sharp(svgBuffer).composite([
    { input: clover.buffer, top: cloverTop, left: cloverLeft },
    { input: einstein.buffer, top: einsteinTop, left: einsteinLeft },
    { input: tiger.buffer, top: tigerTop, left: tigerLeft },
  ]);

  const pngBuffer = await baseImage
    .png({ compressionLevel: 8, palette: false })
    .toBuffer();

  const webpBuffer = await sharp(pngBuffer)
    .webp({ quality: 92 })
    .toBuffer();

  await Promise.all([
    fs.promises.writeFile(outputPngPath, pngBuffer),
    fs.promises.writeFile(outputWebpPath, webpBuffer),
    fs.promises.writeFile(outputBannerPngPath, pngBuffer),
  ]);

  console.log(`Successfully generated site banners:`);
  console.log(`- ${outputPngPath}`);
  console.log(`- ${outputWebpPath}`);
  console.log(`- ${outputBannerPngPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate site banner:', err);
  process.exit(1);
});
