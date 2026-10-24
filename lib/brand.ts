// Preserve the supplied official website PNG byte-for-byte, including its transparency.
export const logoArtwork = {
  width: 10528,
  height: 1352,
  viewport: { x: 182, y: 167, width: 10266, height: 1122 },
};

// The browser icon shows the four-square mark from the same source artwork.
export const logoMarkViewport = { x: 106, y: 267, width: 760, height: 760 };

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
