import Generator from "react-router-sitemap-generator";
import Router from "./src/Router"; //import your react router component

const generator = new Generator("https://www.vordeck.de", Router(), {
  lastmod: new Date().toISOString().slice(0, 10),
  changefreq: "monthly",
  priority: 0.8,
});
generator.save("./sitemap.xml");
