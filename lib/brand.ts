// Preserve the supplied Warm Blues PNG byte-for-byte, including its transparency.
export const logoArtwork = {
  width: 2996,
  height: 354,
  viewport: { x: 0, y: 0, width: 2996, height: 354 },
};

// The browser icon shows the four-square mark from the same source artwork.
export const logoMarkViewport = { x: 42, y: 21, width: 255, height: 269 };

export function logoGeometry(width: number, viewport = logoArtwork.viewport) {
  const scale = width / viewport.width;
  return {
    height: viewport.height * scale,
    imageWidth: logoArtwork.width * scale,
    imageHeight: logoArtwork.height * scale,
    left: -viewport.x * scale,
    top: -viewport.y * scale,
  };
}
