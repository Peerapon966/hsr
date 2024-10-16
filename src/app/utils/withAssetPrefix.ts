export function withAssetPrefix(filepath: string): string {
  const assetPrefix = process.env.ASSET_PREFIX;
  console.log("assetPrefix: ", assetPrefix);

  if (filepath.startsWith("/")) return `${assetPrefix}${filepath}`;

  return `${assetPrefix}/${filepath}`;
}
