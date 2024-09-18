export type AssetFileType = 'png' | 'gif' | 'mp3' | 'jpg' | 'jpeg' | 'svg';

export type AssetMap = {
  [key: string]: Asset;
};

export type Asset = {
  url: string;
  path: string;
  hash: string;
} & AssetType;

export type AssetType =
  | {
      type: 'png' | 'gif' | 'mp3';
    }
  | {
      type: 'jpg' | 'jpeg' | 'svg';
      path_png: string;
    };
