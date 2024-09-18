import { parse as html_parser } from 'node-html-parser';
import { log_yellow, log_green } from './color_log';

const SUBDOMAINS = [
  'www',
  'id',
  'help',
  'dashboard',
  'play',
  'debug',
  'towerdefense2',
  'monsterbrawl',
  'towerdefense',
  'cafe',
  'factory',
  'crazykingdom',
  'towerofdoom',
  'pirate',
  'goldquest',
  'cryptohack',
  'fishingfrenzy',
  'deceptivedinos',
  'battleroyale',
  'racing',
  'blookrush',
  'classic',
  'santasworkshop',
];

/**
 * Scrapes the scripts from Blooket
 * @returns String containing all the scripts concatenated together
 */
export default async function (): Promise<string> {
  const script_text: string[] = [];
  for (const subdomain of SUBDOMAINS) {
    const url = `https://${subdomain}.blooket.com`;
    log_yellow('get_scripts', `scraping '${url}'`);
    const res = await fetch(url);
    const raw_html = await res.text();
    const dom = html_parser(raw_html);
    const scripts = Object.values(dom.querySelectorAll('script[src^="https://ac.blooket.com"]'));
    for (const script of scripts) {
      const src = script.getAttribute('src')!;
      const res = await fetch(src);
      const text = await res.text();
      script_text.push(text);
    }
    script_text.push(raw_html);
  }
  log_green('get_scripts', 'finished');
  return script_text.join('\n');
}
