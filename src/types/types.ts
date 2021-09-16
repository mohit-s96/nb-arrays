export type ArrayCallback<T> = (
  iterator?: T,
  index?: number,
  context?: AsyncArrayType
) => any;
export interface AsyncArrayType extends Array<any> {
  init<T>(array: Array<T>): Promise<null>;
  mapAsync<T>(
    callback: ArrayCallback<T>,
    chunkSize?: number
  ): Promise<AsyncArrayType>;

  filterAsync<T>(
    callback: ArrayCallback<T>,
    chunkSize?: number
  ): Promise<AsyncArrayType>;

  forEachAsync<T>(
    callback: ArrayCallback<T>,
    chunkSize?: number
  ): Promise<null>;
}
