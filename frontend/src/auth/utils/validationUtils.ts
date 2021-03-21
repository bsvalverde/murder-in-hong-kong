export function trim(value: string): boolean | string {
  return !value || value.trim() ? true : 'invalidField';
}
