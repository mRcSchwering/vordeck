import { P, BlockCode, Img, Code, A } from "../components";

const reactLink = <A href="https://react.dev/" label="React" />;

const typescriptLink = (
  <A href="https://www.typescriptlang.org/" label="TypeScript" />
);

const reactrouterLink = (
  <A href="https://github.com/remix-run/react-router" label="React Router" />
);

const babelpresetsLink = (
  <A href="https://babeljs.io/docs/presets" label="Babel presets" />
);

const craLink = (
  <A href="https://create-react-app.dev/" label="Create React App" />
);

const vordeckLink = (
  <A href="https://github.com/mRcSchwering/vordeck" label="vordeck.de" />
);

const findPathsCode = `function findPaths(fileName) {
  const regex = /path(: |=)"(\\/[\\w-\\/]+)"/;
  const lines = fs.readFileSync(fileName).toString("utf-8").split("\\n");
  let grps = [];
  for (const line of lines) {
    if (line.search(regex) > -1) {
      grps.push(line.match(regex)[2]);
    }
  }
  return grps;
}`;

const genCode = `const fs = require("fs");

const outfile = "public/sitemap.xml";
const url = "https://vordeck.de";
const files = ["./src/App.tsx", "./src/kns/index.tsx"];
const date = new Date().toJSON().slice(0, 10);

function findPaths(fileName) {
  const regex = /path(: |=)"(\\/[\\w-\\/]+)"/;
  const lines = fs.readFileSync(fileName).toString("utf-8").split("\\n");
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
      xmlLines.push(\`    <\${key}>\${record[key]}</\${key}>\`);
    }
    xmlLines.push("  </url>");
  }
  xmlLines.push("</urlset>");
  return xmlLines;
}

console.log(\`generating \${outfile}...\`);
let paths = [];
for (const file of files) {
  paths.push(...findPaths(file));
}

xml = toXml(paths);
fs.writeFileSync(outfile, xml.join("\\n"));
console.log("...done");`;

const packageCode = `{
  ...
  "scripts": {
    ...
    "build": "react-scripts build && node sitemap-generator.js",
    ...
  },
  ...
}`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://www.langweiledich.net/wp-content/uploads/2020/09/Internationale-lo-fi-study-girl-adaptionen_07.jpg"
        width="600px"
        height="400px"
      />
      <P>
        A <i>sitemap.xml</i> is meant to inform search engines about available
        URLs on your website. The format is simple. All URLs can listed in a{" "}
        <Code>{`<loc>`}</Code> tag each. However, I found that libraries for
        generating this <i>sitemap.xml</i> are surprisingly non-trivial.
      </P>
      <P>
        My usual frontend stack is something using {typescriptLink}, and{" "}
        {reactLink} with {reactrouterLink}. There are libraries that want to
        extract URLs from React Router and use them to create the{" "}
        <i>sitemap.xml</i>. These libraries usually require some{" "}
        {babelpresetsLink} and with TypeScript some extra presets are required.
        Furthermore, my build environment might look different to my development
        environment. I don't want the build process to start installing ts-node
        just to generate a <i>sitemap.xml</i>. So, I would need to rearrange my
        React Router route definitions in a way that they can be imported
        without importing other libraries (<i>i.e.</i> React). In this app for
        example ({vordeckLink}) this would not be possible without some weird
        hacks. In total, it would add a lot of complexity to achieve a rather
        simple task.
      </P>
      <P>
        Instead I created my own little <i>sitemap.xml</i> generator without any
        dependencies or rearrangements. Of course this particular example only
        works for this one webapp. But since it is so simple, it is easy to
        adjust it to other code bases. It's basically a function that uses Regex
        patterns to find React router path definitions in a file.
      </P>
      <BlockCode code={findPathsCode} lang="javascript" />
      <P>
        In a different project I would just adjust the Regex. This function has
        to be pointed to the files in which React router paths might be defined.
        Then, everything has to be converted to the correct <i>sitemap.xml</i>{" "}
        structure and written. In my case it looks like this:
      </P>
      <BlockCode
        code={genCode}
        lang="javascript"
        label="sitemap-generator.js"
      />
      <P>
        This project is bootstrapped with {craLink}. From the project root the
        script can be run as <Code>node sitemap-generator.js</Code>. You could
        parametrize all these constants, but in my case this wasn't necessary.
        Finally, the <i>sitemap.xml</i> can be generated automatically after
        building by adding this to your build script:
      </P>
      <BlockCode code={packageCode} lang="json" label="package.json" />
    </>
  );
}
