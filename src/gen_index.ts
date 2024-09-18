import type { AssetMap } from './mappings';

function boldify(text: string) {
  return text.replace(/\$\d+?/, v => `<b>${v}</b>`);
}

export default function (asset_map: AssetMap) {
  const sorted_map = Object.entries(asset_map)
    //@ts-ignore
    .sort((a, b) => a[0].toLowerCase() > b[0].toLowerCase())
    .map(([name, data]) => {
      return [
        data.type,
        boldify(name),
        `<a href="${data.path}">${boldify(data.path)}</a>`,
        'path_png' in data ? `<a href="${data.path_png}">${boldify(data.path_png)}</a>` : '',
        `<a href="${data.url}">${data.url}</a>`,
        data.hash
      ] as const;
    });

  Bun.write(
    'public/index.html',
    `<body style="margin:auto;font-family:Monospace,Arial;background:#1f1f1f;color:#f1f1f1"><style>a {color:#08C2CE} a:visited{color:#127f7f} table td{border-right:1px solid white;padding-right:15px} b{color:red}</style><h2>Asset Index</h2><table style="text-wrap: nowrap;"><tr style="text-align: left">` +
      `<th>Type</th><th>Mapped Name</th><th>File Name</th><th>Alt File Name</th><th>Source URL</th><th>Source Hash</th></tr>${sorted_map
        .map(data => `<tr>${data.map(v => `<td>${v}</td>`).join('')}</tr>`)
        .join('')}</table>`
  );
}
