import { CaseTransformer } from '../..'

export const service = (transformer: CaseTransformer): string => {
  return `import { Create${transformer.pascalCase}DTO } from '../dtos/create-${transformer.kebabCase}.dto'
import { ${transformer.pascalCase} } from '../models/${transformer.kebabCase}.model'

export interface ${transformer.pascalCase}Service {
  get${transformer.pascalCase}s: () => Promise<${transformer.pascalCase}[]>
  get${transformer.pascalCase}: (uuid: string) => Promise<${transformer.pascalCase}>
  create${transformer.pascalCase}: (dto: Create${transformer.pascalCase}DTO) => Promise<${transformer.pascalCase}>
  update${transformer.pascalCase}: (uuid: string, dto: Create${transformer.pascalCase}DTO) => Promise<${transformer.pascalCase}>
  delete${transformer.pascalCase}: (uuid: string) => Promise<void>
}

export class ${transformer.pascalCase}DefaultService implements ${transformer.pascalCase}Service {
  async get${transformer.pascalCase}s (): Promise<${transformer.pascalCase}[]> {
    return await ${transformer.pascalCase}.find()
  }

  async get${transformer.pascalCase} (uuid: string): Promise<${transformer.pascalCase}> {
    return await ${transformer.pascalCase}.findOneOrFail({
      where: { uuid }
    })
  }

  async create${transformer.pascalCase} (dto: Create${transformer.pascalCase}DTO): Promise<${transformer.pascalCase}> {
    const ${transformer.camelCase} = ${transformer.pascalCase}.create(dto)

    await ${transformer.camelCase}.save()

    return await this.get${transformer.pascalCase}(${transformer.camelCase}.uuid)
  }

  async update${transformer.pascalCase} (uuid: string, dto: Create${transformer.pascalCase}DTO): Promise<${transformer.pascalCase}> {
    const ${transformer.camelCase} = await this.get${transformer.pascalCase}(uuid)

    Object.assign(${transformer.camelCase}, dto)

    return await ${transformer.camelCase}.save()
  }

  async delete${transformer.pascalCase} (uuid: string): Promise<void> {
    const ${transformer.camelCase} = await this.get${transformer.pascalCase}(uuid)

    await ${transformer.camelCase}.softRemove()
  }
}
`
}
