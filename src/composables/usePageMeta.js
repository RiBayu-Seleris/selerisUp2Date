import { onBeforeUnmount, watchEffect } from "vue";

const SITE_ORIGIN = "https://seleris.ai";

const TAGS = [
  { key: "description", attr: "name", name: "description" },
  { key: "title", attr: "property", name: "og:title" },
  { key: "description", attr: "property", name: "og:description" },
  { key: "url", attr: "property", name: "og:url" },
  { key: "image", attr: "property", name: "og:image" },
  { key: "type", attr: "property", name: "og:type" },
  { key: "title", attr: "name", name: "twitter:title" },
  { key: "description", attr: "name", name: "twitter:description" },
  { key: "image", attr: "name", name: "twitter:image" },
];

export function usePageMeta(source) {
  const previous = new Map();
  const created = [];
  let canonical = null;
  let previousCanonical = null;
  let canonicalCreated = false;

  const ensureTag = (attr, name) => {
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
      created.push(el);
    } else if (!previous.has(el)) {
      previous.set(el, el.getAttribute("content"));
    }
    return el;
  };

  const stop = watchEffect(() => {
    const meta = source();
    const values = {
      ...meta,
      url: meta.path ? SITE_ORIGIN + meta.path : undefined,
      image: meta.image ? new URL(meta.image, SITE_ORIGIN).href : undefined,
      type: meta.type || "website",
    };

    for (const tag of TAGS) {
      const value = values[tag.key];
      if (!value) continue;
      ensureTag(tag.attr, tag.name).setAttribute("content", value);
    }

    if (values.url) {
      canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
        canonicalCreated = true;
      } else if (previousCanonical === null && !canonicalCreated) {
        previousCanonical = canonical.getAttribute("href");
      }
      canonical.setAttribute("href", values.url);
    }
  });

  onBeforeUnmount(() => {
    stop();
    previous.forEach((content, el) => {
      if (content === null) el.removeAttribute("content");
      else el.setAttribute("content", content);
    });
    created.forEach((el) => el.remove());
    if (canonical) {
      if (canonicalCreated) canonical.remove();
      else if (previousCanonical !== null)
        canonical.setAttribute("href", previousCanonical);
    }
  });
}
