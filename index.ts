import { log_green, log_yellow } from './src/color_log';
import get_scripts from './src/get_scripts';
import parse_urls from './src/parse_urls';
import download from './src/download';
import gen_index from './src/gen_index';
import { stringify } from 'smol-toml';
import { parseArgs } from 'util';
import type { AssetMap } from './src/mappings';

const { values: args } = parseArgs({
  args: Bun.argv,
  options: {
    check: {
      type: 'boolean',
      short: 'c',
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});

const script_text = await get_scripts();
const images = parse_urls(script_text);

log_green('index', `found ${images.length} assets`);

if (args.check) {
  const previous_mapping: AssetMap = await Bun.file('./public/mappings.json').json();
  const urls = Object.values(previous_mapping).map(({ url }) => url);

  const new_urls = images.filter(url => !urls.includes(url));
  const old_urls = urls.filter(url => !images.includes(url));

  // for (const url of new_urls) log_green('check', `+ ${url}`);
  // for (const url of old_urls) log_red('check', `- ${url}`);

  log_yellow('check', `${new_urls.length} new/duplicate assets`);
  log_yellow('check', `${old_urls.length} removed assets`);

  process.exit(0);
}

const asset_map = await download(images);

Bun.write('public/mappings.json', JSON.stringify(asset_map, null, 2));
Bun.write('public/mappings.toml', stringify(asset_map));

gen_index(asset_map);

Bun.write('public/mappings.d.ts', await Bun.file('./src/mappings.d.ts').text());

log_green('index', 'finished');
