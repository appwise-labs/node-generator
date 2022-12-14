import { CaseTransformer } from '../..'

export const controller = (transformer: CaseTransformer): string => {
  return `import { Request } from 'express'
import { Create${transformer.pascalCase}DTO } from '../dtos/create-${transformer.kebabCase}.dto'
import { ${transformer.pascalCase}DefaultService, ${transformer.pascalCase}Service } from '../services/${transformer.kebabCase}.service'
import { ${transformer.camelCase}Transformer, ${transformer.pascalCase}TransformerType } from '../transformers/${transformer.kebabCase}.transformer'

export class ${transformer.pascalCase}Controller {
  private readonly ${transformer.camelCase}Service: ${transformer.pascalCase}Service

  constructor (${transformer.camelCase}Service: ${transformer.pascalCase}Service = new ${transformer.pascalCase}DefaultService()) {
    this.${transformer.camelCase}Service = ${transformer.camelCase}Service

    this.get${transformer.pascalCase}s = this.get${transformer.pascalCase}s.bind(this)
    this.get${transformer.pascalCase} = this.get${transformer.pascalCase}.bind(this)
    this.create${transformer.pascalCase} = this.create${transformer.pascalCase}.bind(this)
    this.update${transformer.pascalCase} = this.update${transformer.pascalCase}.bind(this)
    this.delete${transformer.pascalCase} = this.delete${transformer.pascalCase}.bind(this)
  }

  async get${transformer.pascalCase}s (_req: Request): Promise<${transformer.pascalCase}TransformerType[]> {
    const ${transformer.camelCase}s = await this.${transformer.camelCase}Service.get${transformer.pascalCase}s()

    return ${transformer.camelCase}Transformer.array(${transformer.camelCase}s)
  }

  async get${transformer.pascalCase} (req: Request): Promise<${transformer.pascalCase}TransformerType> {
    const ${transformer.camelCase} = await this.${transformer.camelCase}Service.get${transformer.pascalCase}(req.params.${transformer.camelCase})

    return ${transformer.camelCase}Transformer.item(${transformer.camelCase})
  }

  async create${transformer.pascalCase} (req: Request, dto: Create${transformer.pascalCase}DTO): Promise<${transformer.pascalCase}TransformerType> {
    const ${transformer.camelCase} = await this.${transformer.camelCase}Service.create${transformer.pascalCase}(dto)

    return ${transformer.camelCase}Transformer.item(${transformer.camelCase})
  }

  async update${transformer.pascalCase} (req: Request, dto: Create${transformer.pascalCase}DTO): Promise<${transformer.pascalCase}TransformerType> {
    const ${transformer.camelCase} = await this.${transformer.camelCase}Service.update${transformer.pascalCase}(req.params.${transformer.camelCase}, dto)

    return ${transformer.camelCase}Transformer.item(${transformer.camelCase})
  }

  async delete${transformer.pascalCase} (req: Request): Promise<void> {
    await this.${transformer.camelCase}Service.delete${transformer.pascalCase}(req.params.${transformer.camelCase})
  }
}
`
}
