// The supplied PNG stays unchanged. This viewport removes only its transparent
// perimeter, with 32 source pixels of breathing room around the artwork.
export const logoArtwork = {
  width: 4425,
  height: 835,
  viewport: { x: 978, y: 93, width: 2529, height: 702 },
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
