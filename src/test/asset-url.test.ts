import { describe, expect, it } from "vitest";
import { assetUrl } from "@/lib/asset-url";
import heroDay from "@/assets/hero-day.png.asset.json";
import heroNight from "@/assets/hero-night.png.asset.json";
import installation from "@/assets/solar-installation.jpg.asset.json";

describe("External deployment image URLs", () => {
  it.each([heroDay, heroNight, installation])("keeps $original_filename on its asset host rather than Vercel", (asset) => {
    const url = new URL(assetUrl(asset), "https://example.vercel.app");
    expect(url.origin).toBe("https://id-preview--82cfba21-8f0a-42d3-a5b8-e383a2483dcc.lovable.app");
    expect(url.pathname).toBe(asset.url);
  });

  it("preserves other image URLs", () => {
    expect(assetUrl({ url: "/assets/generated.jpg" })).toBe("/assets/generated.jpg");
    expect(assetUrl({ url: "https://example.com/photo.jpg" })).toBe("https://example.com/photo.jpg");
  });
});