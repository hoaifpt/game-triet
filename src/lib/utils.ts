import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeAnswer(input: string) {
  if (!input) return '';
  return input
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^\p{L}\p{N}\s]/gu, '') // remove punctuation
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}
