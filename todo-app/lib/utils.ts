import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import PocketBase from "pocketbase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function customFetch(key: string, init: RequestInit | undefined) {
  return () => fetch('api/' + key, init).then(res => res.json())
}

export const pb = new PocketBase('https://todo-app-test.pockethost.io');

export const STATUS_OPTIONS = [
  {
    value: 'open',
    label: 'Open'
  },
  {
    value: 'in_progress',
    label: 'In Progress'
  },
  {
    value: 'done',
    label: 'Done'
  },
];

export const PRIORITY_OPTIONS = [
  {
    value: 'low',
    label: 'Low'
  },
  {
    value: 'medium',
    label: 'Medium'
  },
  {
    value: 'high',
    label: 'High'
  },
];