export function getFirstImageSrcFromHTML(html: string): string | null {
  const match = html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
  return match ? match[1] : null;
}
