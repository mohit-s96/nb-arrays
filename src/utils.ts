export const THOUSAND = 1000;
export const TEN_THOUSAND = 10000;
export const H_THOUSAND = 100000;
export const MILLION = 1000000;
export const TEN_MILLION = 10000000;
export const FIFTY_MILLION = 50000000;

export function resolveChunkSize(len: number) {
  if (len < H_THOUSAND) {
    return THOUSAND;
  }
  if (len > H_THOUSAND && len < MILLION) {
    return THOUSAND;
  }
  if (len > MILLION && len < TEN_MILLION / 2) {
    return TEN_THOUSAND;
  }
  if (len > TEN_MILLION / 2) {
    return H_THOUSAND;
  }

  return THOUSAND;
}
