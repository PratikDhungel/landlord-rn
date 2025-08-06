export function isObjectEmpty(obj: Record<string, any> | null | undefined): boolean {
  // null or undefined case
  if (obj == null) {
    return true
  }

  return Object.keys(obj).length === 0
}
