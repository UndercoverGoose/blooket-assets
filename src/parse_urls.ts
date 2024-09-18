const EXTENSIONS = ['png', 'svg', 'jpeg', 'jpg', 'gif', 'mp3'];

/**
 * Takes a string and parses out image urls
 * @param text The text to parse through
 * @returns Array of all the urls
 */
export default function (text: string): string[] {
  const urls: string[] = [];
  for (const extension of EXTENSIONS) {
    const regex = new RegExp(`https://[^"']+?\\.${extension}`, 'ig');
    const matched_urls = text.match(regex);
    if (!matched_urls) continue;
    urls.push(...matched_urls);
  }
  return Array.from(new Set(urls));
}
