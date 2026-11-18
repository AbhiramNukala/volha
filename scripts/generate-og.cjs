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
  return `${years}${half} years`;
}

// Render die-cut sticker with soft physical drop shadow
async function renderStickerWithShadow(imagePath, { width, alpha = 0.22, blur = 7, shadowOffsetY = 7, pad = 24, rotate = 0 } = {}) {
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
      background: { r: 24, g: 24, b: 27, alpha }
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

  const [einstein, tiger] = await Promise.all([
    renderStickerWithShadow(einsteinPath, { width: 185, alpha: 0.22, blur: 8, shadowOffsetY: 7 }),
    renderStickerWithShadow(tigerPath, { width: 90, alpha: 0.20, blur: 5, shadowOffsetY: 5, rotate: 1 }),
  ]);

  const expText = getDynamicExpText();

  // Pure open editorial layout — completely free of card boxes, borders, and rounded containers
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>

  <!-- Clean, open canvas background matching portfolio light theme -->
  <rect width="1200" height="630" fill="#fafafa"/>

  <!-- ==================== LEFT COLUMN: OPEN EDITORIAL TYPOGRAPHY ==================== -->

  <!-- Top Metadata Line (Open text, NO pill box, NO background rectangle) -->
  <g transform="translate(80, 85)">
    <circle cx="4" cy="-4" r="4.5" fill="#ea580c"/>
    <text x="18" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="2.5" fill="#18181b">NUKALA ABHIRAM</text>
    <circle cx="210" cy="-4" r="2.5" fill="#a1a1aa"/>
    <text x="224" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" letter-spacing="1.5" fill="#71717a">SOFTWARE ENGINEER</text>
    <circle cx="410" cy="-4" r="2.5" fill="#d4d4d8"/>
    <text x="424" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" letter-spacing="1" fill="#a1a1aa">HYDERABAD, IN</text>
  </g>

  <!-- Main Headline in Instrument Serif (Open, spacious, elegant) -->
  <g transform="translate(80, 195)">
    <text font-family="'Instrument Serif', Georgia, serif" font-size="50" font-weight="normal" fill="#09090b" letter-spacing="-0.8">
      Building <tspan font-style="italic" fill="url(#orangeGrad)">React.js</tspan> web apps &amp;
    </text>
    <text y="68" font-family="'Instrument Serif', Georgia, serif" font-size="50" font-weight="normal" fill="#09090b" letter-spacing="-0.8">
      <tspan font-style="italic" fill="url(#orangeGrad)">React Native</tspan> mobile systems.
    </text>
  </g>

  <!-- Minimal Summary (Open text, 2 clean lines) -->
  <g transform="translate(80, 345)">
    <text font-family="'Inter', -apple-system, sans-serif" font-size="17" font-weight="400" fill="#3f3f46" letter-spacing="0.1">
      Software Engineer with ${expText} of experience building production React.js
    </text>
    <text y="28" font-family="'Inter', -apple-system, sans-serif" font-size="17" font-weight="400" fill="#71717a" letter-spacing="0.1">
      web applications, React Native mobile systems, and C++ / JSI Nitro Modules.
    </text>
  </g>

  <!-- Tech Stack (Open text with dots, NO BOXES, NO PILLS) -->
  <g transform="translate(80, 435)">
    <text font-family="'JetBrains Mono', monospace" font-size="13.5" font-weight="500">
      <tspan fill="#ea580c" font-weight="700">React.js</tspan>
      <tspan fill="#d4d4d8">   ·   </tspan>
      <tspan fill="#ea580c" font-weight="700">React Native</tspan>
      <tspan fill="#d4d4d8">   ·   </tspan>
      <tspan fill="#18181b">TypeScript</tspan>
      <tspan fill="#d4d4d8">   ·   </tspan>
      <tspan fill="#ea580c" font-weight="700">C++ / JSI</tspan>
      <tspan fill="#d4d4d8">   ·   </tspan>
      <tspan fill="#18181b">Expo</tspan>
      <tspan fill="#d4d4d8">   ·   </tspan>
      <tspan fill="#71717a">Hermes</tspan>
    </text>
  </g>

  <!-- Thin hairline divider -->
  <line x1="80" y1="495" x2="1120" y2="495" stroke="#e4e4e7" stroke-width="1.2"/>

  <!-- Footer Information Line -->
  <g transform="translate(80, 545)">
    <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#ea580c" letter-spacing="0.5">
      abhiramnukala.netlify.app
    </text>
    <text x="245" y="0" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#71717a">
      ·   May 2024 – Present   ·   Hyderabad, India   ·   IST (UTC+05:30)
    </text>
  </g>

  <!-- ==================== RIGHT COLUMN: FLOATING EINSTEIN & OPEN QUOTE ==================== -->

  <!-- Quote Text (Open text directly on canvas — NO BOX, NO CARD BORDER!) -->
  <g transform="translate(835, 345)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-style="italic" font-size="11.5" fill="#18181b" letter-spacing="-0.2">
      “If your code compiles on the first try,
    </text>
    <text x="0" y="22" font-family="'JetBrains Mono', monospace" font-style="italic" font-size="11.5" fill="#18181b" letter-spacing="-0.2">
      don’t celebrate. Something is deeply wrong.”
    </text>
    <text x="290" y="52" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ea580c" letter-spacing="1.5" text-anchor="end">
      — THEORY OF RELATIVE DEBUGGING
    </text>
  </g>

</svg>
`;

  const svgBuffer = Buffer.from(svg);

  // Position Einstein centered above the quote text
  // Quote is at x=835, width ~290 -> center is 835 + 145 = 980
  const einsteinLeft = Math.round(980 - (einstein.width / 2));
  const einsteinTop = 90;

  // Position Tiger in bottom right corner (resting openly)
  const tigerLeft = 1040;
  const tigerTop = 475;

  const baseImage = sharp(svgBuffer).composite([
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

  console.log(`Successfully generated open editorial site banners:`);
  console.log(`- ${outputPngPath}`);
  console.log(`- ${outputWebpPath}`);
  console.log(`- ${outputBannerPngPath}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate site banner:', err);
  process.exit(1);
});
