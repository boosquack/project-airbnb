export const getImageUrl = (filename) => {
  return new URL(`/src/assets/${filename}`, import.meta.url).href;
};
