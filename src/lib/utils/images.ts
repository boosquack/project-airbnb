export const getImageUrl = (filename: string): string => {
  return new URL(`/src/assets/${filename}`, import.meta.url).href;
};
