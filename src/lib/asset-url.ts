// Asset delivery is hosted by Lovable, not by an external deployment's origin.
const assetOrigin = "https://id-preview--82cfba21-8f0a-42d3-a5b8-e383a2483dcc.lovable.app";

export function assetUrl(asset: { url: string }): string {
  return asset.url.startsWith("/__l5e/assets-v1/")
    ? new URL(asset.url, assetOrigin).href
    : asset.url;
}