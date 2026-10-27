import { Product, ALL_CATEGORIES } from '../types';

export const CSV_HEADERS = [
  'sku',
  'name',
  'category',
  'price',
  'sizes',
  'color',
  'description',
  'stock',
  'imageUrl',
  'badge',
  'material',
  'fit',
];

// Fallback products in case offline / file sandbox prevents direct network fetch
export const DEFAULT_PRODUCTS: Product[] = [
  {
    sku: 'TL-PTS-001',
    name: 'Heavyweight 240 GSM Boxy Plain Tee',
    category: 'Plain T-shirts',
    price: 799,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Onyx Black',
    description: 'Pre-shrunk 100% combed cotton with dense micro-rib collar and dropped shoulder silhouette. Breathable yet substantial handfeel.',
    stock: 42,
    imageUrl: './images/product_tshirt_minimal_1793012315796.jpg',
    badge: 'Best Seller',
    material: '100% Combed Cotton',
    fit: 'Boxy Oversized Fit',
  },
  {
    sku: 'TL-PTS-002',
    name: 'Essential Supima Cotton Crewneck',
    category: 'Plain T-shirts',
    price: 899,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Off White',
    description: 'Ultra-soft Californian Supima long-staple cotton tailored with a refined ribbed neckline for everyday layering.',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    badge: 'Essential',
    material: '100% Supima Cotton',
    fit: 'Regular Fit',
  },
  {
    sku: 'TL-PTS-003',
    name: 'Mineral Washed Slate Plain Tee',
    category: 'Plain T-shirts',
    price: 849,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Slate Grey',
    description: 'Pigment garment-dyed crewneck offering rich vintage undertones and a broken-in soft drape from day one.',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    badge: 'New Arrival',
    material: '100% Ring-Spun Cotton',
    fit: 'Relaxed Fit',
  },
  {
    sku: 'TL-PRT-001',
    name: 'Architectural Grid Graphic Tee',
    category: 'Printed T-shirts',
    price: 999,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Chalk White',
    description: 'High-density screenprint celebrating modernist architecture on our signature 220 GSM combed jersey.',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    badge: 'Trending',
    material: '100% Combed Cotton',
    fit: 'Oversized Drop-Shoulder',
  },
  {
    sku: 'TL-PRT-002',
    name: 'Monolith Abstract Typography Tee',
    category: 'Printed T-shirts',
    price: 949,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Washed Charcoal',
    description: 'Brutalist typographic front print inspired by urban Tokyo geometry with distress-wash finish.',
    stock: 38,
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80',
    material: '100% Cotton Jersey',
    fit: 'Relaxed Fit',
  },
  {
    sku: 'TL-GYM-001',
    name: 'Aura Pro Performance Mesh Gym Tee',
    category: 'Gym T-shirts',
    price: 899,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Charcoal Grey',
    description: 'Engineered zoned micro-perforation fabric with rapid moisture dispersion and 4-way mechanical stretch.',
    stock: 65,
    imageUrl: './images/product_gym_tee_1793012316718.jpg',
    badge: 'Best Seller',
    material: '88% Poly 12% Spandex',
    fit: 'Athletic Active Fit',
  },
  {
    sku: 'TL-GYM-002',
    name: 'Seamless Compression Core Tee',
    category: 'Gym T-shirts',
    price: 1099,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Matte Black',
    description: 'Zero-chafe seamless tubular construction providing targeted muscle support and thermo-regulation during intense lifting.',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    badge: 'High Performance',
    material: '90% Nylon 10% Elastane',
    fit: 'Compression Fit',
  },
  {
    sku: 'TL-SHT-001',
    name: 'Kuro Camp-Collar Linen Overshirt',
    category: 'Shirts',
    price: 1899,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Sand Beige',
    description: 'Relaxed cuban open-collar shirt in breathable textured pure flax linen. Perfect layered over our plain tees.',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    badge: "Editor's Choice",
    material: '100% French Linen',
    fit: 'Relaxed Camp Fit',
  },
  {
    sku: 'TL-SHT-002',
    name: 'Heavyweight Oxford Button-Down',
    category: 'Shirts',
    price: 1699,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Chambray Blue',
    description: 'Traditional basket-weave 100% cotton Oxford cloth with mother-of-pearl buttons and curved hemline.',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    badge: 'Essential',
    material: '100% Oxford Cotton',
    fit: 'Tailored Classic',
  },
  {
    sku: 'TL-JNS-001',
    name: 'Heritage 14oz Selvedge Raw Denim',
    category: 'Jeans',
    price: 2499,
    sizes: ['28', '30', '32', '34', '36'],
    color: 'Raw Indigo',
    description: 'Unwashed authentic Japanese redline selvedge denim designed to develop unique personal fade creases over years of wear.',
    stock: 27,
    imageUrl: './images/product_denim_raw_1793012316312.jpg',
    badge: 'Artisan Grade',
    material: '100% Selvedge Cotton',
    fit: 'Straight Leg',
  },
  {
    sku: 'TL-JNS-002',
    name: 'Modern Tapered Washed Jeans',
    category: 'Jeans',
    price: 1999,
    sizes: ['30', '32', '34', '36'],
    color: 'Vintage Fade Blue',
    description: 'Medium vintage wash denim with 1% elastane for comfort movement while maintaining crisp structured drape.',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    material: '99% Cotton 1% Elastane',
    fit: 'Slim Tapered',
  },
  {
    sku: 'TL-TRS-001',
    name: 'Pleated Wide-Leg Wool-Blend Trousers',
    category: 'Trousers',
    price: 2199,
    sizes: ['30', '32', '34', '36'],
    color: 'Graphite Grey',
    description: 'Single forward pleats, deep slant side pockets, and clean cuffed hem creating a timeless contemporary architectural silhouette.',
    stock: 26,
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
    badge: 'Trending',
    material: '70% Cotton 30% Wool Blend',
    fit: 'Relaxed Wide Leg',
  },
  {
    sku: 'TL-TRS-002',
    name: 'Tailored Stretch Commuter Chinos',
    category: 'Trousers',
    price: 1799,
    sizes: ['28', '30', '32', '34', '36'],
    color: 'Khaki Stone',
    description: 'Wrinkle-resistant compact twill cotton with concealed zipped passport pocket for effortless daily city movement.',
    stock: 48,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80',
    badge: 'Essential',
    material: '97% Cotton 3% Elastane',
    fit: 'Modern Slim Taper',
  },
  {
    sku: 'TL-SHT-010',
    name: 'Everyday Drawstring Linen-Blend Shorts',
    category: 'Shorts',
    price: 1299,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Warm Oatmeal',
    description: 'Casual warm-weather shorts with encased elastic waistband, cotton drawcord, and rear welt pocket.',
    stock: 34,
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=80',
    badge: 'Summer Essential',
    material: '55% Linen 45% Cotton',
    fit: 'Regular 7-inch Inseam',
  },
  {
    sku: 'TL-JGR-001',
    name: 'Heavy French Terry Cuffed Joggers',
    category: 'Joggers',
    price: 1699,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Heather Grey',
    description: 'Crafted from 400 GSM brushed loopback French terry with heavy ribbed ankle cuffs and deep jersey-lined pockets.',
    stock: 37,
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    material: '100% French Terry Cotton',
    fit: 'Relaxed Tapered',
  },
  {
    sku: 'TL-HOD-001',
    name: '450 GSM Boxy Heavyweight Hoodie',
    category: 'Hoodies & Sweatshirts',
    price: 2499,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Sage Green',
    description: 'Indestructible ultra-dense 450 GSM French terry hoodie with double-layer hood, no drawstrings, and seamless kangaroo pocket.',
    stock: 31,
    imageUrl: './images/product_hoodie_mineral_1793012316379.jpg',
    badge: 'Flagship Drop',
    material: '100% Heavy French Terry',
    fit: 'Oversized Boxy',
  },
  {
    sku: 'TL-HOD-002',
    name: 'Washed Vintage Zip-Up Hoodie',
    category: 'Hoodies & Sweatshirts',
    price: 2399,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Faded Charcoal',
    description: 'Two-way matte black metal zipper, sun-faded wash, and ribbed side gusset panels for enhanced mobility.',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    material: '100% Ring-Spun Cotton',
    fit: 'Relaxed Fit',
  },
  {
    sku: 'TL-HOD-003',
    name: 'Minimalist Raglan Crewneck Sweatshirt',
    category: 'Hoodies & Sweatshirts',
    price: 1999,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Muted Sand',
    description: 'Classic athletic raglan sleeve crewneck with triangular collar insert and thick ribbed cuffs.',
    stock: 33,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
    badge: 'Staff Pick',
    material: '100% Organic Cotton',
    fit: 'Relaxed Classic',
  },
];

/**
 * Standard RFC-4180 CSV parser that properly supports:
 * - Commas within quoted values (e.g. "S, M, L, XL")
 * - Escaped quotes ("")
 * - Multiline entries
 * - UTF-8 BOM
 */
export function parseCSV(text: string): string[][] {
  const cleanText = text.replace(/^\uFEFF/, '').trim();
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.some((c) => c !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  // Push remainder
  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some((c) => c !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Converts CSV rows to typed Product array
 */
export function csvRowsToProducts(rows: string[][]): { products: Product[]; errors: string[] } {
  if (rows.length < 2) {
    return { products: [], errors: ['CSV contains no data rows or missing header row.'] };
  }

  const rawHeaders = rows[0].map((h) => h.toLowerCase().trim());
  const headerMap: Record<string, number> = {};
  rawHeaders.forEach((h, idx) => {
    headerMap[h] = idx;
  });

  const required = ['sku', 'name', 'category', 'price'];
  const missing = required.filter((r) => headerMap[r] === undefined);
  if (missing.length > 0) {
    return {
      products: [],
      errors: [`Missing required columns: ${missing.join(', ')}. Please check your CSV header.`],
    };
  }

  const products: Product[] = [];
  const errors: string[] = [];
  const seenSkus = new Set<string>();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const getVal = (col: string): string => {
      const idx = headerMap[col];
      return idx !== undefined && row[idx] !== undefined ? row[idx].trim() : '';
    };

    const sku = getVal('sku');
    const name = getVal('name');
    const category = getVal('category') || 'Plain T-shirts';
    const rawPrice = getVal('price').replace(/[^0-9.]/g, '');
    const price = parseFloat(rawPrice) || 0;

    if (!sku || !name) {
      errors.push(`Row ${i + 1}: Skipped due to missing SKU or Product Name.`);
      continue;
    }

    if (seenSkus.has(sku)) {
      errors.push(`Row ${i + 1}: Duplicate SKU "${sku}". Only the first instance is kept.`);
      continue;
    }
    seenSkus.add(sku);

    const rawSizes = getVal('sizes');
    const sizes = rawSizes
      ? rawSizes
          .split(/[,/|]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : ['S', 'M', 'L', 'XL'];

    const rawStock = getVal('stock').replace(/[^0-9]/g, '');
    const stock = rawStock ? parseInt(rawStock, 10) : 25;

    let imageUrl = getVal('imageurl') || getVal('image');
    if (!imageUrl) {
      // Default placeholder based on category
      imageUrl = './images/product_tshirt_minimal_1793012315796.jpg';
    }

    products.push({
      sku,
      name,
      category,
      price,
      sizes,
      color: getVal('color') || 'Classic',
      description: getVal('description') || 'Premium tailored garment crafted for everyday comfort and longevity.',
      stock,
      imageUrl,
      badge: getVal('badge') || undefined,
      material: getVal('material') || undefined,
      fit: getVal('fit') || undefined,
    });
  }

  return { products, errors };
}

/**
 * Loads products from public/products.csv with localStorage caching & fallback
 */
export async function loadProductsCatalogue(): Promise<{
  products: Product[];
  source: 'csv' | 'localstorage' | 'defaults';
  errors: string[];
}> {
  // Check if user has saved modified catalogue in localStorage
  const localSaved = localStorage.getItem('threadlab_custom_products');
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { products: parsed, source: 'localstorage', errors: [] };
      }
    } catch {
      // Ignore parse error and proceed to fetch CSV
    }
  }

  // Attempt to fetch public/products.csv
  try {
    const urls = ['./products.csv', '/products.csv', 'products.csv'];
    let text = '';
    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          text = await res.text();
          if (text.includes('sku') && text.includes('name')) {
            break;
          }
        }
      } catch {
        // try next url
      }
    }

    if (text) {
      const rows = parseCSV(text);
      const { products, errors } = csvRowsToProducts(rows);
      if (products.length > 0) {
        return { products, source: 'csv', errors };
      }
    }
  } catch (err) {
    console.warn('Could not fetch products.csv, falling back to embedded defaults:', err);
  }

  // Fallback to rich embedded defaults
  return { products: DEFAULT_PRODUCTS, source: 'defaults', errors: [] };
}

/**
 * Serializes a list of Products back to CSV string
 */
export function serializeProductsToCSV(products: Product[]): string {
  const headerLine = CSV_HEADERS.join(',');
  const rowLines = products.map((p) => {
    const values = [
      p.sku,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category.replace(/"/g, '""')}"`,
      p.price.toString(),
      `"${p.sizes.join(', ')}"`,
      `"${p.color.replace(/"/g, '""')}"`,
      `"${p.description.replace(/"/g, '""')}"`,
      p.stock.toString(),
      `"${p.imageUrl}"`,
      `"${(p.badge || '').replace(/"/g, '""')}"`,
      `"${(p.material || '').replace(/"/g, '""')}"`,
      `"${(p.fit || '').replace(/"/g, '""')}"`,
    ];
    return values.join(',');
  });

  return [headerLine, ...rowLines].join('\n');
}

/**
 * Triggers a browser download of the CSV file
 */
export function downloadProductsCsvFile(products: Product[], filename = 'products.csv') {
  const csvContent = serializeProductsToCSV(products);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates XML sitemap string directly in the browser from product list
 */
export function generateSitemapXml(products: Product[]): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>./</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Categories
  categories.forEach((cat) => {
    const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    xml += `  <url>
    <loc>./#category=${encodeURIComponent(slug)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });

  // Products
  products.forEach((p) => {
    const cleanName = p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    xml += `  <url>
    <loc>./#product=${encodeURIComponent(p.sku)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${p.imageUrl}</image:loc>
      <image:title>${cleanName}</image:title>
      <image:caption>${cleanName} - THREADLAB Clothing</image:caption>
    </image:image>
  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

/**
 * Triggers browser download of generated sitemap.xml
 */
export function downloadSitemapXmlFile(products: Product[], filename = 'sitemap.xml') {
  const sitemapContent = generateSitemapXml(products);
  const blob = new Blob([sitemapContent], { type: 'application/xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

