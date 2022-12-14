import { CaseTransformer } from '../..'

export const index = (transformer: CaseTransformer): string => {
  return `export * from './routers/${transformer.kebabCase}.router'
export * from './models/${transformer.kebabCase}.model'
export * from './transformers/${transformer.kebabCase}.transformer'
export * from './services/${transformer.kebabCase}.service'
`
}
