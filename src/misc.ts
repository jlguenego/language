export const has = <K extends string>(
  x: object,
  key: K
): x is {[key in K]: unknown} => key in x;

export function symbolToString(s: unknown): string {
  if (typeof s === 'object' && s !== null) {
    if (s.toString !== Object.prototype.toString) {
      return s.toString();
    }
    if (has(s, 'name') && typeof s.name === 'string') {
      return s.name;
    }
  }
  if (typeof s === 'string') {
    return s;
  }
  throw new Error(
    'Cannot toString a symbol. Please be sure there is a custom toString method, or give it a name attribute.'
  );
}
