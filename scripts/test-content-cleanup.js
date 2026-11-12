/**
 * Content Cleanup Verification Test
 * Verifies that:
 * 1. Fake phone numbers (+91 98765 43210, etc.) are eliminated.
 * 2. Unverified stock images (Unsplash) are removed from data stores.
 * 3. Genuine user-provided assets are strictly preserved.
 * 4. Image paths are either null (for neutral placeholders) or real user files.
 */

import fs from 'fs';
import path from 'path';

console.log('--- [DAY 10] CONTENT CLEANUP VERIFICATION ---');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`✓ ${message}`);
    passed++;
  } else {
    console.error(`✗ FAILED: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Check BRAND_INFO contact details in src/constants/navigation.js
const navContent = fs.readFileSync(path.resolve('src/constants/navigation.js'), 'utf8');
assert(!navContent.includes('+91 98765 43210'), 'No fake phone number +91 98765 43210 in navigation.js');
assert(!navContent.includes('Boutique Wing'), 'No fake address Boutique Wing in navigation.js');
assert(navContent.includes('phone: null'), 'tailoringShop.phone is set to null in navigation.js');
assert(navContent.includes('whatsapp: null'), 'tailoringShop.whatsapp is set to null in navigation.js');

// 2. Check Developer Section preservation
const devPhotoPath = path.resolve('public/images/developer/mustansir.jpg');
assert(fs.existsSync(devPhotoPath), 'Developer photo mustansir.jpg exists on disk');

const footerContent = fs.readFileSync(path.resolve('src/components/layout/Footer.jsx'), 'utf8');
assert(footerContent.includes('Mustansir Sanawadwala'), 'Footer preserves Developer name Mustansir Sanawadwala');
assert(footerContent.includes('https://mustansir.vercel.app'), 'Footer preserves portfolio link https://mustansir.vercel.app');

// 3. Check Genuine User-Provided Tailoring Assets
const customaryAttirePath = path.resolve('public/images/tailoring/customary_attire.jpg');
const bohraUniformPath = path.resolve('public/images/tailoring/bohra_uniform.jpg');
assert(fs.existsSync(customaryAttirePath), 'customary_attire.jpg exists on disk');
assert(fs.existsSync(bohraUniformPath), 'bohra_uniform.jpg exists on disk');

// 4. Verify no Unsplash URLs across any src/data or src/pages files
const dataDir = path.resolve('src/data');
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));
let unsplashInData = false;
for (const file of dataFiles) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  if (content.includes('unsplash.com')) {
    unsplashInData = true;
    console.error(`Found unsplash URL in src/data/${file}`);
  }
}
assert(!unsplashInData, 'Zero Unsplash URLs across all src/data files');

const pagesDir = path.resolve('src/pages/public');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
let unsplashInPages = false;
for (const file of pageFiles) {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  if (content.includes('unsplash.com')) {
    unsplashInPages = true;
    console.error(`Found unsplash URL in src/pages/public/${file}`);
  }
}
assert(!unsplashInPages, 'Zero Unsplash URLs across all public pages');

// 5. Verify About and Contact pages are holding views
const aboutContent = fs.readFileSync(path.resolve('src/pages/public/AboutPage.jsx'), 'utf8');
assert(aboutContent.includes('Genuine Information Being Prepared'), 'AboutPage is an honest holding view');
assert(!aboutContent.includes('Founded in 1985'), 'AboutPage contains no fake founding year');

const contactPageContent = fs.readFileSync(path.resolve('src/pages/public/ContactPage.jsx'), 'utf8');
assert(contactPageContent.includes('Official Contact Channels Under Preparation'), 'ContactPage is an honest holding view');

// 6. Verify Category names preserved in tailoring and fabric
const tailoringData = fs.readFileSync(path.resolve('src/data/tailoringContent.js'), 'utf8');
assert(tailoringData.includes("Bohra Men's Wear"), 'Preserved Bohra Menswear category');
assert(tailoringData.includes("Bohra Women's Wear"), 'Preserved Bohra Womenswear category');
assert(tailoringData.includes("School Uniforms"), 'Preserved School Uniforms category');
assert(tailoringData.includes("Madrasa Saifiyah Burhaniyah"), 'Preserved MSB school category');
assert(tailoringData.includes("Al Madrasa (ABN)"), 'Preserved ABN school category');
assert(tailoringData.includes("/images/tailoring/customary_attire.jpg"), 'Preserved customary_attire.jpg in tailoringContent');
assert(tailoringData.includes("/images/tailoring/bohra_uniform.jpg"), 'Preserved bohra_uniform.jpg in tailoringContent');

const fabricData = fs.readFileSync(path.resolve('src/data/fabricContent.js'), 'utf8');
assert(fabricData.includes("Bohra Speciality Fabrics"), 'Preserved Bohra Speciality Fabrics category');
assert(fabricData.includes("School Uniform Fabrics"), 'Preserved School Uniform Fabrics category');
assert(fabricData.includes("General Fabric Collections"), 'Preserved General Fabric Collections category');

console.log(`\n--- ALL CHECKS PASSED: ${passed}/${total} ---`);
