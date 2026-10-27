import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const docsDir = path.join(rootDir, 'docs');

console.log('[Post-Build] Starting THREADLAB GitHub Pages & Standalone packaging...');

const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[Post-Build] Error: dist/index.html not found! Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Find CSS asset files and inline them
const assetsDir = path.join(distDir, 'assets');
let inlinedCss = '';

if (fs.existsSync(assetsDir)) {
  const assetFiles = fs.readdirSync(assetsDir);
  const cssFiles = assetFiles.filter((f) => f.endsWith('.css'));

  for (const cssFile of cssFiles) {
    const cssPath = path.join(assetsDir, cssFile);
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    inlinedCss += cssContent + '\n';
  }

  // 2. Find JS asset files and inline them
  const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));
  let inlinedJs = '';

  for (const jsFile of jsFiles) {
    const jsPath = path.join(assetsDir, jsFile);
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    inlinedJs += jsContent + '\n';
  }

  if (inlinedCss) {
    // Remove existing link rel=stylesheet pointing to assets/
    html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*href=["'][^"']*assets\/[^"']+["'][^>]*>/gi, '');
    html = html.replace(/<link[^>]+href=["'][^"']*assets\/[^"']+["'][^>]*rel=["']stylesheet["'][^>]*>/gi, '');
    
    // Inject inlined stylesheet into <head>
    html = html.replace('</head>', `<style id="threadlab-styles">\n${inlinedCss}\n</style>\n</head>`);
    console.log(`[Post-Build] Inlined ${inlinedCss.length} bytes of CSS into index.html`);
  }

  if (inlinedJs) {
    // Remove existing script module pointing to assets/
    html = html.replace(/<script[^>]+type=["']module["'][^>]*src=["'][^"']*assets\/[^"']+["'][^>]*><\/script>/gi, '');
    html = html.replace(/<script[^>]+src=["'][^"']*assets\/[^"']+["'][^>]*type=["']module["'][^>]*><\/script>/gi, '');

    // Inject inlined module script before </body>
    html = html.replace('</body>', `<script type="module">\n${inlinedJs}\n</script>\n</body>`);
    console.log(`[Post-Build] Inlined ${inlinedJs.length} bytes of JS into index.html`);
  }
}

// 3. Write self-contained dist/index.html
fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('[Post-Build] Generated self-contained standalone dist/index.html');

// 4. Ensure dist/404.html is identical copy for SPA fallback
const fourOhFourPath = path.join(distDir, '404.html');
fs.writeFileSync(fourOhFourPath, html, 'utf8');
console.log('[Post-Build] Created dist/404.html');

// 5. Ensure .nojekyll in dist/
const distNoJekyll = path.join(distDir, '.nojekyll');
fs.writeFileSync(distNoJekyll, '', 'utf8');

// 6. Ensure .nojekyll in public/
const publicNoJekyll = path.join(publicDir, '.nojekyll');
fs.writeFileSync(publicNoJekyll, '', 'utf8');

// 7. Mirror complete dist/ into docs/ folder for GitHub Pages "deploy from /docs" support
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
fs.cpSync(distDir, docsDir, { recursive: true });
console.log('[Post-Build] Mirrored dist/ to docs/ for GitHub Pages /docs folder support.');

// 8. Copy self-contained index.html directly into public/ for instant single-file download
const publicStandaloneHtml = path.join(publicDir, 'index-standalone.html');
fs.writeFileSync(publicStandaloneHtml, html, 'utf8');

// 9. Call python packager to create clean zips
try {
  execSync('python3 scripts/package-zips.py', { cwd: rootDir, stdio: 'inherit' });
} catch (zipErr) {
  console.warn('[Post-Build] Warning packaging zips:', zipErr.message);
}

console.log('[Post-Build] Complete! THREADLAB is ready for zero-error GitHub Pages hosting.');
