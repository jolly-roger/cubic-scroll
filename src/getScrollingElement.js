export default function getScrollingElement(documentEl) {
  const doc = documentEl || document;

  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }

  return (doc.documentElement) ? doc.documentElement : doc.body;
}
