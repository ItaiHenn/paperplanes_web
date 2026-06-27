#!/usr/bin/env node
/* Run: node generate-sitemap.js
   Regenerates sitemap.xml and episodes-meta.json from js/data.js.
   Run this after adding new episodes, then commit + push both files. */

const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'js/data.js'), 'utf8');
const BASE = 'https://paperplanes.co.il';
const today = new Date().toISOString().split('T')[0];

// --- Extract episodes ---
const eps = [];
for (const line of src.split('\n')) {
  const m = line.match(/\{id:"([^"]+)",country:"([^"]*)",title:"([^"]*)",title_en:"([^"]*)",cover:"([^"]*)"/);
  if (!m) continue;
  const dateM = line.match(/date:"([^"]*)"/);
  const descM = line.match(/description:"((?:[^"\\]|\\.)*)"/);
  eps.push({
    id: m[1],
    country: m[2],
    title: m[3],
    cover: m[5],
    desc: descM ? descM[1].replace(/\\n/g, ' ').substring(0, 200) : '',
    date: dateM ? dateM[1] : today,
  });
}

// --- Extract country codes ---
const countries = [];
const cRegex = /code:"([a-z]{2,3})"/g;
let cm;
while ((cm = cRegex.exec(src)) !== null) countries.push(cm[1]);

// --- Write episodes-meta.json ---
fs.writeFileSync(
  path.join(__dirname, 'episodes-meta.json'),
  JSON.stringify(eps.map(({ id, country, title, cover, desc }) => ({ id, country, title, cover, desc })))
);

// --- Build sitemap.xml ---
const statics = [
  { loc: '/',                priority: '1.0', freq: 'weekly' },
  { loc: '/about.html',     priority: '0.8', freq: 'monthly' },
  { loc: '/discounts.html', priority: '0.8', freq: 'weekly' },
  { loc: '/guides.html',    priority: '0.8', freq: 'weekly' },
  { loc: '/contact.html',   priority: '0.6', freq: 'yearly' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

statics.forEach(p => {
  xml += `  <url><loc>${BASE}${p.loc}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority><changefreq>${p.freq}</changefreq></url>\n`;
});

countries.forEach(c => {
  xml += `  <url><loc>${BASE}/country.html?c=${c}</loc><lastmod>${today}</lastmod><priority>0.7</priority><changefreq>weekly</changefreq></url>\n`;
});

eps.forEach(e => {
  xml += `  <url><loc>${BASE}/episode.html?id=${encodeURIComponent(e.id)}</loc><lastmod>${e.date}</lastmod><priority>0.9</priority><changefreq>yearly</changefreq></url>\n`;
});

xml += '</urlset>';
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);

console.log(`✅ sitemap.xml updated — ${eps.length} episodes, ${countries.length} countries, ${statics.length + eps.length + countries.length} total URLs`);
console.log(`✅ episodes-meta.json updated — ${eps.length} entries`);
console.log(`\nNext: git add sitemap.xml episodes-meta.json && git commit -m "Update sitemap" && git push`);
