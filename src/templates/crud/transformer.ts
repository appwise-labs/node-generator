import { CaseTransformer } from '../..'

export const transformer = (transformer: CaseTransformer): string => {
  return `import { Transformer } from '@appwise/express-dto-router'
import { ${transformer.pascalCase} } from '../models/${transformer.kebabCase}.model'

export interface ${transformer.pascalCase}TransformerType {
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

class ${transformer.pascalCase}Transformer extends Transformer<${transformer.pascalCase}, ${transformer.pascalCase}TransformerType> {
  transform (${transformer.camelCase}: ${transformer.pascalCase}): ${transformer.pascalCase}TransformerType {
    return {
      uuid: ${transformer.camelCase}.uuid,
      createdAt: ${transformer.camelCase}.createdAt.toISOString(),
      updatedAt: ${transformer.camelCase}.updatedAt.toISOString(),
      deletedAt: ${transformer.camelCase}.deletedAt?.toISOString() ?? null
    }
  }
}

export const ${transformer.camelCase}Transformer = new ${transformer.pascalCase}Transformer()
`
}
