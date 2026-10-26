// Preserve the supplied PRS Golden Logo PNG byte-for-byte, including its transparency.
export const logoArtwork = {
  width: 13310,
  height: 1951,
  viewport: { x: 1175, y: 474, width: 10386, height: 1133 },
};

// The browser icon shows the four-square mark from the same source artwork.
export const logoMarkViewport = { x: 1098, y: 579, width: 762, height: 762 };

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
