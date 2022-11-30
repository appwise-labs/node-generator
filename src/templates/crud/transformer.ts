export const transformer = (kebabCase: string, pascalCase: string, camelCase: string): string => {
  return `import { ${pascalCase} } from '../models/${kebabCase}.model'

export interface ${pascalCase}TransormerType {
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export class ${pascalCase}Transformer {
  static item (${camelCase}: ${pascalCase}): ${pascalCase}TransormerType
  static item (${camelCase}?: ${pascalCase} | null): ${pascalCase}TransormerType | null | undefined
  static item (${camelCase}?: ${pascalCase} | null): ${pascalCase}TransormerType | null | undefined {
    if (${camelCase} == null) return ${camelCase}

    return {
      uuid: ${camelCase}.uuid,
      createdAt: ${camelCase}.createdAt.toISOString(),
      updatedAt: ${camelCase}.updatedAt.toISOString(),
      deletedAt: ${camelCase}.deletedAt?.toISOString() ?? null
    }
  }

  static array (${camelCase}s: ${pascalCase}[]): ${pascalCase}TransormerType[] {
    if (${camelCase}s == null) return ${camelCase}s

    return ${camelCase}s.map(${camelCase} => ${pascalCase}Transformer.item(${camelCase}))
  }
}
`
}
