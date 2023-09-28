/**
 * Encodes a string using Base64.
 *
 * @param value - The string to be encoded.
 * @returns The Base64 encoded string.
 */
export function encode(value: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  return btoa(String.fromCharCode(...data));
}

/**
 * Decodes a Base64 encoded string.
 *
 * @param value - The Base64 encoded string to be decoded.
 * @returns The decoded string.
 */
export function decode(value: string): string {
  const bytes = Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}
