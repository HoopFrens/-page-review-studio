// The supplied PNG stays unchanged. This viewport removes only its transparent
// perimeter, with 32 source pixels of breathing room around the artwork.
export const logoArtwork = {
  width: 2996,
  height: 1006,
  viewport: { x: 67, y: 74, width: 2819, height: 797 },
};

export function logoGeometry(width: number) {
  const scale = width / logoArtwork.viewport.width;
  return {
    height: logoArtwork.viewport.height * scale,
    imageWidth: logoArtwork.width * scale,
    imageHeight: logoArtwork.height * scale,
    left: -logoArtwork.viewport.x * scale,
    top: -logoArtwork.viewport.y * scale,
  };
}
