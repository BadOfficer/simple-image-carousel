export function prepareImageUrl(
  url: string,
  width: number = 400,
  height: number = 400,
) {
  return url.replace(/(\/\d+\/\d+)$/, `/${width}/${height}`);
}
