export function removeImagesFromHTML(html: string): string {
  return html.replace(/<img[^>]*>/gi, '');
}