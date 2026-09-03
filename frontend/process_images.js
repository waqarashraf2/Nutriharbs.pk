const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'c:/xampp/htdocs/Projects/WhatsApp Unknown 2026-09-03 at 1.20.03 AM';
const outDir = path.join(__dirname, 'public/images/products');
const logoDir = path.join(__dirname, 'public/images');

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(logoDir, { recursive: true });

async function processAll() {
  console.log('Processing images...');

  // 1. Logo
  const logoSrc = path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.12 AM (2).jpeg');
  await sharp(logoSrc)
    .trim()
    .png()
    .toFile(path.join(logoDir, 'logo.png'));
  console.log('✓ Logo saved');

  // Helper for black background removal -> convert outer black to transparent or clean white
  async function makeBlackTransparent(inputPath, outputPath) {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // data has 4 channels: R, G, B, A
    const len = data.length;
    for (let i = 0; i < len; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // If near black (outer black background)
      if (r < 25 && g < 25 && b < 25) {
        data[i + 3] = 0; // Transparent
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      }
    })
    .trim()
    .webp({ quality: 90 })
    .toFile(outputPath);
    console.log(`✓ Processed transparent webp: ${path.basename(outputPath)}`);
  }

  // 2. Niston Biotin (already white background)
  const biotinSrc = path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.11 AM.jpeg');
  await sharp(biotinSrc)
    .trim()
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'niston-biotin.webp'));
  console.log('✓ Niston Biotin saved');

  // 3. Glowing Glutathione
  await makeBlackTransparent(
    path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.13 AM.jpeg'),
    path.join(outDir, 'glowing-glutathione.webp')
  );

  // 4. Ainfer-X Male Health
  await makeBlackTransparent(
    path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.13 AM (1).jpeg'),
    path.join(outDir, 'ainfer-x-male.webp')
  );

  // 5. Biodetox
  await makeBlackTransparent(
    path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.14 AM.jpeg'),
    path.join(outDir, 'biodetox.webp')
  );

  // 6. Vivomit Glow Collagen
  await makeBlackTransparent(
    path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.14 AM (1).jpeg'),
    path.join(outDir, 'vivomit-collagen.webp')
  );

  // 7. Vita-S
  await makeBlackTransparent(
    path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.15 AM.jpeg'),
    path.join(outDir, 'vita-s.webp')
  );

  // 8. KalFit Bone & Joint
  const kalfitSrc = path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.15 AM (1).jpeg');
  await sharp(kalfitSrc)
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'kalfit-bone-joint.webp'));
  console.log('✓ KalFit saved');

  // 9. Ginrex (crop card from mobile screenshot)
  const ginrexSrc = path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.11 AM (1).jpeg');
  const ginrexMeta = await sharp(ginrexSrc).metadata();
  const cropLeft = Math.round(ginrexMeta.width * 0.05);
  const cropWidth = Math.round(ginrexMeta.width * 0.90);
  const cropTop = Math.round(ginrexMeta.height * 0.32);
  const cropHeight = Math.round(ginrexMeta.height * 0.40);
  await sharp(ginrexSrc)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .trim()
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'ginrex-multivitamin.webp'));
  console.log('✓ Ginrex saved');

  // 10. Elevit (crop card from mobile screenshot)
  const elevitSrc = path.join(srcDir, 'WhatsApp Image 2026-09-02 at 1.57.12 AM.jpeg');
  const elevitMeta = await sharp(elevitSrc).metadata();
  await sharp(elevitSrc)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .trim()
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'elevit-multivitamin.webp'));
  console.log('✓ Elevit saved');

  console.log('ALL IMAGES PROCESSED SUCCESSFULLY!');
}

processAll().catch(err => {
  console.error('Error processing images:', err);
});
