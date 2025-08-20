export function getUserFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
}

export function capitalize(label: string): string {
  if (!label) {
    return ''
  }

  return label.charAt(0).toUpperCase() + label.slice(1)
}
