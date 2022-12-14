import { CaseTransformer } from '../..'

export const indexDocs = (transformer: CaseTransformer): string => {
  return `get:
  summary: Get ${transformer.readableCase}
  tags: [${transformer.pascalCase}s]
  responses:
    200:
      description: OK
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '../transformers/${transformer.kebabCase}.transformer.yaml'
  security:
    - OAuth2: []

post:
  summary: Create ${transformer.readableCase}
  tags: [${transformer.pascalCase}s]
  requestBody:
    content:
      application/json:
        schema:
          $ref: '../dtos/create-${transformer.kebabCase}.dto.yaml'
  responses:
    200:
      description: ${transformer.readableCase} created
      content:
        application/json:
          schema:
            $ref: '../transformers/${transformer.kebabCase}.transformer.yaml'
  security:
    - OAuth2: []
`
}
