export const router = (kebabCase: string, pascalCase: string, camelCase: string): string => {
  return `import { DTORouter } from '@appwise/express-dto-router'
import { ${pascalCase}Controller } from '../controllers/${kebabCase}.controller'
import { Create${pascalCase}DTO } from '../dtos/create-${kebabCase}.dto'

export const ${camelCase}Router = new DTORouter()

const ${camelCase}Controller = new ${pascalCase}Controller()

${camelCase}Router.get('/', ${camelCase}Controller.get${pascalCase}s)
${camelCase}Router.post('/', Create${pascalCase}DTO, ${camelCase}Controller.create${pascalCase})

${camelCase}Router.get('/:${camelCase}', ${camelCase}Controller.get${pascalCase})
${camelCase}Router.post('/:${camelCase}', Create${pascalCase}DTO, ${camelCase}Controller.update${pascalCase})
${camelCase}Router.delete('/:${camelCase}', ${camelCase}Controller.delete${pascalCase})
`
}
