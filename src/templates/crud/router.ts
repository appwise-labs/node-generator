import { CaseTransformer } from '../..'

export const router = (transformer: CaseTransformer): string => {
  return `import { DTORouter } from '@appwise/express-dto-router'
import { ${transformer.pascalCase}Controller } from '../controllers/${transformer.kebabCase}.controller'
import { Create${transformer.pascalCase}DTO } from '../dtos/create-${transformer.kebabCase}.dto'

export const ${transformer.camelCase}Router = new DTORouter()

const ${transformer.camelCase}Controller = new ${transformer.pascalCase}Controller()

${transformer.camelCase}Router.get('/', ${transformer.camelCase}Controller.get${transformer.pascalCase}s)
${transformer.camelCase}Router.post('/', Create${transformer.pascalCase}DTO, ${transformer.camelCase}Controller.create${transformer.pascalCase})

${transformer.camelCase}Router.get('/:${transformer.camelCase}', ${transformer.camelCase}Controller.get${transformer.pascalCase})
${transformer.camelCase}Router.post('/:${transformer.camelCase}', Create${transformer.pascalCase}DTO, ${transformer.camelCase}Controller.update${transformer.pascalCase})
${transformer.camelCase}Router.delete('/:${transformer.camelCase}', ${transformer.camelCase}Controller.delete${transformer.pascalCase})
`
}
