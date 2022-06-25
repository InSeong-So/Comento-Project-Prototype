export function throttle(delay, callback, options) {
  const { noTrailing = false, noLeading = false, debounceMode = undefined } = options || {};

  let timeoutID;
  let cancelled = false;

  let lastExec = 0;

  const clearExistingTimeout = () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  };

  const cancel = cancleOption => {
    const { upcomingOnly = false } = cancleOption || {};
    clearExistingTimeout();
    cancelled = !upcomingOnly;
  };

  const wrapper = (...rest) => {
    const elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    }

    const exec = () => {
      lastExec = Date.now();
      callback.apply(this, rest);
    };

    const clear = () => {
      timeoutID = undefined;
    };

    if (!noLeading && debounceMode && !timeoutID) exec();

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        lastExec = Date.now();
        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        exec();
      }
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  };

  wrapper.cancel = cancel;

  return wrapper;
}
