
export function toCamelCase (text: string): string {
  return text.replace(/-\w/g, clearAndUpper)
}

export function toPascalCase (text: string): string {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}

export function clearAndUpper (text: string): string {
  return text.replace(/-/, '').toUpperCase()
}

export function isKebabCase (text: string): boolean {
  return /^[a-z]+(?:-[a-z]+)*$/.test(text)
}
