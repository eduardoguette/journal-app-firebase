/**
 * It returns a function that will call the callback function after a certain amount of time has
 * passed, but if the function is called again before that time has passed, it will reset the timer and
 * wait again
 * @param callback - The function to be called after the wait time.
 * @param wait - The number of milliseconds to wait before calling the callback.
 * @param callFirst - If true, the callback will be called immediately.
 * @returns A function that will call the callback function after the wait time has passed.
 */
export function debounce(callback, wait, callFirst) {
  let timerId;
  let call = callFirst;
  return (...args) => {
    if (call) {
      callback(...args);
      call = false;
      return;
    }
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
      call = callFirst;
    }, wait);
  };
}
