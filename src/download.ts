import { log_red, log_yellow, log_green, log_gray } from './color_log';
import type { AssetMap, AssetFileType } from './mappings';
import pngify from './pngify';

function resolve_path(url: string): [string, AssetFileType] {
  const original = url.split('/').pop()!;
  const extension = original.split('.').pop()! as AssetFileType;
  const raw = original.slice(0, original.lastIndexOf('.'));
  if (!raw.includes('-')) return [raw, extension];
  const extra = raw.slice(raw.indexOf('-') + 1);
  if (extra.length !== 8) return [raw, extension];
  return [raw.slice(0, raw.indexOf('-')), extension];
}

/**
 * Downloads the assets at given urls
 * @param urls An array of URLs to download from
 */
export default async function (urls: string[]): Promise<AssetMap> {
  const asset_map: AssetMap = {};
  const asset_names_lowercase: Set<string> = new Set();
  const asset_hashes: Set<string> = new Set();
  for (let url_index = 0; url_index < urls.length; url_index++) {
    const url = urls[url_index];
    const log_prefix = `download (${url_index + 1}/${urls.length})`;

    let [asset_name, asset_extension] = resolve_path(url);

    let i = 1;
    while (asset_names_lowercase.has(asset_name.toLowerCase())) {
      asset_name = asset_name.replace(/\$\d+$/, '') + `$${i++}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      log_red(log_prefix, `failed to download <- ${url}'`);
      continue;
    }
    const content_type = res.headers.get('content-type');
    if (!content_type?.startsWith('image') && !content_type?.startsWith('audio')) {
      log_red(log_prefix, `failed to save: '${content_type}' is not an image <- ${url}`);
      continue;
    }

    const blob = await res.blob();
    const hash_sha256 = new Bun.SHA256().update(await blob.arrayBuffer()).digest('hex');

    if (asset_hashes.has(hash_sha256)) {
      log_gray(log_prefix, `skip (duplicate hash) <- ${url}`);
      continue;
    }

    convert: {
      if (['gif', 'png', 'mp3'].includes(asset_extension)) break convert;
      try {
        const png = await pngify(blob, asset_extension === 'svg');
        await png.toFile(`public/${asset_name}.png`);
      } catch {
        log_red(log_prefix, `failed to convert to png <- ${url}`);
      }
    }

    await Bun.write(`./public/${asset_name}.${asset_extension}`, blob);
    asset_names_lowercase.add(asset_name.toLowerCase());
    asset_hashes.add(hash_sha256);

    if (asset_map[asset_name]) {
      log_red(log_prefix, `duplicate asset name '${asset_name}'`);
      continue;
    }

    if (asset_extension === 'jpg' || asset_extension === 'jpeg' || asset_extension === 'svg') {
      asset_map[asset_name] = {
        url,
        path: `${asset_name}.${asset_extension}`,
        hash: hash_sha256,
        type: asset_extension,
        path_png: `${asset_name}.png`,
      };
    } else {
      asset_map[asset_name] = {
        url,
        path: `${asset_name}.${asset_extension}`,
        hash: hash_sha256,
        type: asset_extension,
      };
    }

    log_yellow(log_prefix, `${asset_name}.${asset_extension} <- ${url}`);
  }
  log_green('download', 'finished');
  return asset_map;
}
