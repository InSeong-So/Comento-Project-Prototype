import { throttle } from './throttle';

export const debounce = (delay, callback, options) => {
  const { atBegin = false } = options || {};
  return throttle(delay, callback, { debounceMode: atBegin !== false });
};
