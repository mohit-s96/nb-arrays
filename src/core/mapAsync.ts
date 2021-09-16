import AsyncArray from './main';
import { H_THOUSAND, MILLION, FIFTY_MILLION, resolveChunkSize } from '../utils';
import { ArrayCallback, AsyncArrayType } from '../types/types';

/**
 * Takes a callback function as the first argument which recieves the current iterator, index and context as arguments.
 * Takes an optional second argument describing the chunk size. Chunk size determines the minimum array chunk to process every tick of the event loop. If not supplied, it is determined internally.
 * @param computation callback function
 * @param chunkSize optional chunk size
 * @returns Promise with the resolve value of the new array
 */
async function mapAsync<T>(
  this: AsyncArray,
  computation: ArrayCallback<T>,
  chunkSize?: number
): Promise<AsyncArrayType> {
  if (typeof computation !== 'function') {
    throw Error('The first argument to forEachAsync must be a function');
  }
  if (!Array.isArray(this)) {
    throw Error(`Expected "this" to be an Array, instead got ${typeof this}`);
  }
  let len = this.length;
  if (len < H_THOUSAND) {
    console.warn(
      'Array length is small enough to run synchrounusly without blocking thread. Consider using async array methods for array larger than ' +
        H_THOUSAND +
        ' and preferebally over ' +
        MILLION
    );
  }
  if (len > FIFTY_MILLION) {
    console.warn(
      'Array length is too large. Iteration over such large arrays can cause memory crashes. Proceed at your own risk'
    );
  }
  if (!chunkSize) {
    chunkSize = resolveChunkSize(len);
  }
  let i = 0;
  const newArr: AsyncArrayType = new AsyncArray();
  newArr.init(this);
  const that = this;
  return new Promise(function (resolve, reject) {
    function inner(i: number) {
      try {
        if (i === len) {
          resolve(newArr);
          return;
        }
        setTimeout(function () {
          let step = chunkSize as unknown as number;
          if (i + step > len) {
            step = len - i;
          }
          let j = i;
          for (; i < j + step; i++) {
            newArr[i] = computation(
              that[i],
              i,
              that as unknown as AsyncArrayType
            );
          }
          inner(i);
        });
      } catch (error) {
        reject(error);
      }
    }
    inner(i);
  });
}

export default mapAsync;
