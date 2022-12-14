import type { CaseTransformer } from '../..'

export const detailDocs = (transformer: CaseTransformer): string => {
  return `get:
  summary: Get ${transformer.readableCase} detail
  tags: [${transformer.pascalCase}s]
  parameters:
    - $ref: '../parameters/${transformer.kebabCase}.path.yaml'
  responses:
    200:
      description: OK
      content:
        application/json:
          schema:
            $ref: '../transformers/${transformer.kebabCase}.transformer.yaml'
  security:
    - OAuth2: []

post:
  summary: Update ${transformer.readableCase}
  tags: [${transformer.pascalCase}s]
  parameters:
    - $ref: '../parameters/${transformer.kebabCase}.path.yaml'
  requestBody:
    content:
      application/json:
        schema:
          $ref: '../dtos/update-${transformer.kebabCase}.dto.yaml'
  responses:
    200:
      description: ${transformer.readableCase} updated
      content:
        application/json:
          schema:
            $ref: '../transformers/${transformer.kebabCase}.transformer.yaml'
  security:
    - OAuth2: []

delete:
  summary: Delete ${transformer.readableCase}
  tags: [${transformer.pascalCase}s]
  parameters:
    - $ref: '../parameters/${transformer.kebabCase}.path.yaml'
  responses:
    200:
      description: ${transformer.readableCase} deleted
  security:
    - OAuth2: []
`
}
