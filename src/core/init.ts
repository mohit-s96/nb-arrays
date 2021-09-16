import AsyncArray from './main';

/**
 * Takes an array as the first argument.
 * @param array the array to be processed asynchrounously
 * @returns Promise which resolves with null when array is done initializing
 */
function init<T>(this: AsyncArray, array: Array<T>): Promise<null> {
  const that = this;
  return this.forEachAsync.call(array as AsyncArray, (obj: any) => {
    Array.prototype.push.call(that, obj);
  });
}

export default init;
