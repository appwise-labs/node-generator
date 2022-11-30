export const dto = (_kebabCase: string, pascalCase: string, _camelCase: string): string => {
  return `import { DTO } from '@appwise/express-dto-router'

export class Create${pascalCase}DTO extends DTO {

}
`
}
