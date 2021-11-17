/**
 * Low-tech solution to writing sitemap.xml.
 * Looks for `regex` in `files` to find all paths.
 * Use:
 *
 *  node sitemap-generator.js
 *
 */
const fs = require("fs");

const outfile = "build/sitemap.xml";
const url = "https://vordeck.de";
const files = ["./src/App.tsx", "./src/kns/index.tsx"];
const date = new Date().toJSON().slice(0, 10);

function findPaths(fileName) {
  const regex = /path(: |=)"(\/[\w-\/]+)"/;
  const lines = fs.readFileSync(fileName).toString("utf-8").split("\n");
  let grps = [];
  for (const line of lines) {
    if (line.search(regex) > -1) {
      grps.push(line.match(regex)[2]);
    }
  }
  return grps;
}

function toXml(paths) {
  let pathRecords = paths.map((d) => ({ loc: url + d, lastmod: date }));
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];
  for (const record of pathRecords) {
    xmlLines.push("  <url>");
    for (const key in record) {
      xmlLines.push(`    <${key}>${record[key]}</${key}>`);
    }
    xmlLines.push("  </url>");
  }
  xmlLines.push("</urlset>");
  return xmlLines;
}

console.log(`generating ${outfile}...`);
let paths = [];
for (const file of files) {
  paths.push(...findPaths(file));
}
console.log(`...writing ${paths.length} paths to sitemap...`);

xml = toXml(paths);
fs.writeFileSync(outfile, xml.join("\n"));
console.log("...done");
