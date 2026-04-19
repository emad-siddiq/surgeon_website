/**
 * Minimal className joiner. Falsy values are dropped, duplicates are preserved
 * in order (Tailwind's last-wins rules handle conflicts).
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
