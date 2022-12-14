import { CaseTransformer } from '../..'

export const parameterDocs = (transformer: CaseTransformer): string => {
  return `in: path
name: ${transformer.pascalCase}
description: ${transformer.pascalCase} UUID
schema:
  type: string
  format: uuid
required: true
`
}
