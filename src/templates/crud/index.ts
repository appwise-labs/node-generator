export const index = (kebabCase: string, _pascalCase: string, _camelCase: string): string => {
  return `export * from './routers/${kebabCase}.router'
export * from './models/${kebabCase}.model'
export * from './transformers/${kebabCase}.transformer'
export * from './services/${kebabCase}.service'
`
}
