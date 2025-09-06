import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join } from 'path';

async function generatePwaImages() {
    try {
        // Create output directory if it doesn't exist
        const outputDir = join(process.cwd(), 'public', 'images', 'pwa');
        await fs.mkdir(outputDir, { recursive: true });

        // Define the SVG content
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
  <!-- Background Circle -->
  <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" stroke-width="6" />

  <!-- Split Line -->
  <line x1="50" y1="10" x2="50" y2="90" stroke="#4CAF50" stroke-width="6" stroke-linecap="round" />

  <!-- Currency Symbol Half Left -->
  <text x="34" y="60" font-size="32" text-anchor="middle" fill="#4CAF50" font-family="Arial, sans-serif">₹</text>

  <!-- Currency Symbol Half Right (faded) -->
  <text x="66" y="60" font-size="32" text-anchor="middle" fill="#81C784" font-family="Arial, sans-serif">₹</text>
</svg>`;

        // Define sizes for PWA icons
        const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

        // Generate icons from SVG
        console.log('Generating PWA icons...');
        
        for (const size of sizes) {
            const outputPath = join(outputDir, `icon-${size}x${size}.png`);
            
            await sharp(Buffer.from(svgString))
                .resize(size, size)
                .png()
                .toFile(outputPath);
            
            console.log(`Generated ${size}x${size} icon`);
        }

        // Also create a simple manifest icon
        const manifestIconPath = join(outputDir, 'manifest-icon-192.maskable.png');
        await sharp(Buffer.from(svgString))
            .resize(192, 192)
            .png()
            .toFile(manifestIconPath);
        
        console.log('Generated manifest icon');

        const manifestIcon512Path = join(outputDir, 'manifest-icon-512.maskable.png');
        await sharp(Buffer.from(svgString))
            .resize(512, 512)
            .png()
            .toFile(manifestIcon512Path);
        
        console.log('Generated large manifest icon');

        console.log('PWA images generated successfully!');
    } catch (error) {
        console.error('Error generating PWA images:', error);
    }
}

generatePwaImages();
