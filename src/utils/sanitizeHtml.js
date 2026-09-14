import DOMPurify from "dompurify";

export function bersihkanHtml(html) {
  if (!html) return "";
  return DOMPurify.sanitize(String(html));
}
