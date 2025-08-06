export function getDateFromISOString(isoDate: string) {
  const dateOnly = isoDate.split('T')[0]
  return dateOnly
}
