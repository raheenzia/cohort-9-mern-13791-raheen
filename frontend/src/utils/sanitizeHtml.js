import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "h2",
    "ul",
    "ol",
    "li",
    "blockquote",
];

export function sanitizeHtml(html = "") {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS,
        ALLOWED_ATTR: [],
    });
}