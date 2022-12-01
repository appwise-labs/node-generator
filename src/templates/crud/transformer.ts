export const transformer = (kebabCase: string, pascalCase: string, camelCase: string): string => {
  return `import { Transformer } from '@appwise/express-dto-router'
import { ${pascalCase} } from '../models/${kebabCase}.model'

export interface ${pascalCase}TransformerType {
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

class ${pascalCase}Transformer extends Transformer<${pascalCase}, ${pascalCase}TransformerType> {
  transform (${camelCase}: ${pascalCase}): ${pascalCase}TransformerType {
    return {
      uuid: ${camelCase}.uuid,
      createdAt: ${camelCase}.createdAt.toISOString(),
      updatedAt: ${camelCase}.updatedAt.toISOString(),
      deletedAt: ${camelCase}.deletedAt?.toISOString() ?? null
    }
  }
}

export const ${camelCase}Transformer = new ${pascalCase}Transformer()
`
}
