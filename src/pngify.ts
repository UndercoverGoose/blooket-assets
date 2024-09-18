import sharp from 'sharp';

const MIN_DIMENSION = 1024;

/**
 * Turn an svg into a png
 * @param blob The svg to PNGify
 */
export default async function (blob: Blob, enforce_min = true) {
  if (enforce_min)
    return sharp(await blob.arrayBuffer())
      .resize({
        width: MIN_DIMENSION,
        height: MIN_DIMENSION,
        fit: 'outside',
      })
      .png();
  return sharp(await blob.arrayBuffer()).png();
}
