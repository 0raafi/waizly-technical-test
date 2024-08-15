import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

let debounceTimeout: string | number | NodeJS.Timeout | undefined;


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function customFetch(key: string, init: RequestInit | undefined) {
  return () => fetch('api/' + key, init).then(res => res.json())
}

export const debounce = (func: () => void, timeout: number, options?: any) => {
  const { leading = false, trailing = true } = options || {};
  if (debounceTimeout) {
    if (!leading && !trailing) {
      func();
    }

    if (!trailing) {
      return;
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = undefined;
  }

  if (leading && !debounceTimeout) {
    func();
  }

  debounceTimeout = setTimeout(trailing ? func : () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = undefined;
  }, timeout);
};


export const toURLSearchParams = (query: any) => {
  return new URLSearchParams(query);
}