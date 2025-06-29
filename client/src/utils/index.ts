export function debounceFn<T extends (...args: unknown[]) => void>(
  func: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
