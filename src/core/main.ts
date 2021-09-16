import mapAsync from './mapAsync';
import { AsyncArrayType } from '../types/types';
import init from './init';
import filterAsync from './filterAsync';
import forEachAsync from './forEachAsync';

/**
 * Creates an extension of the base array type with added async iteration methods.
 * @constructor AsyncArray object (Array type)
 * @method init
 * @method mapAsync
 * @method filterAsync
 * @method forEachAsync
 */
class AsyncArray extends Array<any> implements AsyncArrayType {
  /**
   * Takes an array as the first argument.
   * @param array the array to be processed asynchrounously
   * @returns Promise which resolves with null when array is done initializing
   */
  init = init;

  /**
   * Takes a callback function as the first argument which recieves the current iterator, index and context as arguments.
   *
   * Takes an optional second argument describing the chunk size. Chunk size determines the minimum array chunk to process every tick of the event loop. If not supplied, it is determined internally.
   * @param computation callback function
   * @param chunkSize optional chunk size
   * @returns Promise with the resolve value of the new array
   */
  mapAsync = mapAsync;

  /**
   * Takes a callback function as the first argument which recieves the current iterator, index and context as arguments.
   *
   * Takes an optional second argument describing the chunk size. Chunk size determines the minimum array chunk to process every tick of the event loop. If not supplied, it is determined internally.
   * @param computation callback function
   * @param chunkSize optional chunk size
   * @returns Promise with the resolve value of the new filtered array
   */
  filterAsync = filterAsync;

  /**
   * Takes a callback function as the first argument which recieves the current iterator, index and context as arguments.
   *
   * Takes an optional second argument describing the chunk size. Chunk size determines the minimum array chunk to process every tick of the event loop. If not supplied, it is determined internally.
   * @param computation callback function
   * @param chunkSize optional chunk size
   * @returns Promise with the resolve value of **null**
   */
  forEachAsync = forEachAsync;
}

export default AsyncArray;
