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
