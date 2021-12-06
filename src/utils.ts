export function contains(
  str: string,
  substring: string,
  caseInsensitive: boolean = false
): boolean {
  if (caseInsensitive) {
    str = str.toLocaleUpperCase();
    substring = substring.toLocaleUpperCase();
  }

  return str.indexOf(substring) != -1;
}
