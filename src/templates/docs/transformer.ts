import { CaseTransformer } from '../..'

export const transformerDocs = (transformer: CaseTransformer): string => {
  return `type: object
properties:
  uuid:
    type: string
    format: uuid
    description: The UUID of the ${transformer.pascalCase}
  createdAt:
    type: string
    format: date-time
    description: The date the ${transformer.pascalCase} was created
  updatedAt:
    type: string
    format: date-time
    description: The date the ${transformer.pascalCase} was last updated
  `
}
