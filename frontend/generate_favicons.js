const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const logoPath = path.join(__dirname, 'public/images/logo.png');
const appDir = path.join(__dirname, 'src/app');
const publicDir = path.join(__dirname, 'public');

async function makeFavicons() {
  console.log('Generating favicons from logo.png...');
  const { width, height } = await sharp(logoPath).metadata();
  console.log(`Logo dimensions: ${width}x${height}`);

  // In the 671x327 logo, the icon on the left occupies from x=0 to x=220 and y=0 to y=260
  const iconBuffer = await sharp(logoPath)
    .extract({
      left: 0,
      top: 0,
      width: 220,
      height: 260
    })
    .trim()
    .png()
    .toBuffer();

  const icon32 = await sharp(iconBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icon192 = await sharp(iconBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icon512 = await sharp(iconBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(appDir, 'icon.png'), icon192);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), icon192);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icon32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icon32);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

  console.log('✓ Favicons successfully generated!');
}

makeFavicons().catch(err => {
  console.error('Error generating favicons:', err);
});
