## blooket-assets
Houses most images and audio files from [Blooket's website](https://www.blooket.com/). This repository is not affiliated in any way with Blooket LLC.

The assets are downloaded from the publicly available client-side code of [Blooket's website](https://www.blooket.com/). This script does not access any API endpoints or authenticated material, so not all assets are available (ex. news & banners).

All assets are stored within the [`public`](./public) directory. The links to these files are stored in [`public/mappings.json`](./public/mappings.json) and [`public/mappings.toml`](./public/mappings.toml), which provide an easy way to reference the assets. The mapping types are defined in [`src/mappings.d.ts`](./src/mappings.d.ts) and are also available in [`public/mappings.d.ts`](./public/mappings.d.ts).

There is **no guarantee** of any of the following:
- *The assets are up-to-date*
- *The assets sources are accurate*
- *The assets will be available in the future*

Currently, this script supports the following file types: `png` `svg` `jpg` `gif` `mp3`. Any other types are either not supported or not found on the website. Any `svg` or `jpg` images found are automatically converted to `png` format and stored alongside the original. Converted `jpg` images will retain the same dimensions, while `svg` images are upscaled to *at least* 1024x1024 (one dimension will be 1024px while the other is greater than 1024px).

When running the script, it is recommended to delete the [`public`](./public) directory to remove images that no longer exist. If you wish to keep the assets, then nothing needs to be done, but be aware that old assets may be overwritten by new ones. The automatically generated index does not include old assets, so they will not be referenced in the mappings.

The code within this repository is licensed under [Creative Commons Attribution 4.0 International](https://choosealicense.com/licenses/cc-by-4.0/). The assets themselves are property of Blooket LLC and usage must adhere to [their terms](https://www.blooket.com/terms).
