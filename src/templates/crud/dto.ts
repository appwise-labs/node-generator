import { CaseTransformer } from '../..'

export const dto = (transformer: CaseTransformer): string => {
  return `import { DTO } from '@appwise/express-dto-router'

export class Create${transformer.pascalCase}DTO extends DTO {

}
`
}
