import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { healthPricing360 } from "../src/Data/workshops/healthpricing360.js";

const SITE_ORIGIN = "https://seleris.ai";
const LOCALE = "id";

const escape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const MANAGED =
  /\s*<meta\s+(?:name|property)="(?:description|og:title|og:description|og:url|og:type|og:image|og:locale|twitter:title|twitter:description|twitter:image)"[\s\S]*?\/?>/g;

const PAGES = [
  {
    workshop: healthPricing360,
    key: "healthpricing360",
  },
];

export function workshopStaticMeta() {
  return {
    name: "workshop-static-meta",
    apply: "build",
    writeBundle(options) {
      const outDir = options.dir;
      const base = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      const messages = JSON.parse(
        fs.readFileSync(
          fileURLToPath(
            new URL(`../src/locales/${LOCALE}.json`, import.meta.url),
          ),
          "utf8",
        ),
      );

      for (const page of PAGES) {
        const seo = messages.workshop[page.key].seo;
        const url = SITE_ORIGIN + page.workshop.path;
        const image = page.workshop.seo.ogImage
          ? new URL(page.workshop.seo.ogImage, SITE_ORIGIN).href
          : null;

        const tags = [
          `<title>${escape(seo.title)}</title>`,
          `<meta name="description" content="${escape(seo.description)}" />`,
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:locale" content="id_ID" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:title" content="${escape(seo.title)}" />`,
          `<meta property="og:description" content="${escape(seo.description)}" />`,
          `<meta name="twitter:title" content="${escape(seo.title)}" />`,
          `<meta name="twitter:description" content="${escape(seo.description)}" />`,
          ...(image
            ? [
                `<meta property="og:image" content="${image}" />`,
                `<meta name="twitter:image" content="${image}" />`,
              ]
            : []),
        ]
          .map((tag) => `    ${tag}`)
          .join("\n");

        const html = base
          .replace(MANAGED, "")
          .replace("</head>", `${tags}\n  </head>`);

        const target = path.join(outDir, page.workshop.path, "index.html");
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, html);
      }
    },
  };
}
