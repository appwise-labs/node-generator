export const controller = (kebabCase: string, pascalCase: string, camelCase: string): string => {
  return `import { Request } from 'express'
import { Create${pascalCase}DTO } from '../dtos/create-${kebabCase}.dto'
import { ${pascalCase}DefaultService, ${pascalCase}Service } from '../services/${kebabCase}.service'
import { ${pascalCase}Transformer, ${pascalCase}TransormerType } from '../transformers/${kebabCase}.transformer'

export class ${pascalCase}Controller {
  private readonly ${camelCase}Service: ${pascalCase}Service

  constructor (${camelCase}Service: ${pascalCase}Service = new ${pascalCase}DefaultService()) {
    this.${camelCase}Service = ${camelCase}Service

    this.get${pascalCase}s = this.get${pascalCase}s.bind(this)
    this.get${pascalCase} = this.get${pascalCase}.bind(this)
    this.create${pascalCase} = this.create${pascalCase}.bind(this)
    this.update${pascalCase} = this.update${pascalCase}.bind(this)
    this.delete${pascalCase} = this.delete${pascalCase}.bind(this)
  }

  async get${pascalCase}s (_req: Request): Promise<${pascalCase}TransormerType[]> {
    const ${camelCase}s = await this.${camelCase}Service.get${pascalCase}s()

    return ${pascalCase}Transformer.array(${camelCase}s)
  }

  async get${pascalCase} (req: Request): Promise<${pascalCase}TransormerType> {
    const ${camelCase} = await this.${camelCase}Service.get${pascalCase}(req.params.${camelCase})

    return ${pascalCase}Transformer.item(${camelCase})
  }

  async create${pascalCase} (req: Request, dto: Create${pascalCase}DTO): Promise<${pascalCase}TransormerType> {
    const ${camelCase} = await this.${camelCase}Service.create${pascalCase}(dto)

    return ${pascalCase}Transformer.item(${camelCase})
  }

  async update${pascalCase} (req: Request, dto: Create${pascalCase}DTO): Promise<${pascalCase}TransormerType> {
    const ${camelCase} = await this.${camelCase}Service.update${pascalCase}(req.params.${camelCase}, dto)

    return ${pascalCase}Transformer.item(${camelCase})
  }

  async delete${pascalCase} (req: Request): Promise<void> {
    await this.${camelCase}Service.delete${pascalCase}(req.params.${camelCase})
  }
}
`
}
