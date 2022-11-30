export const service = (kebabCase: string, pascalCase: string, camelCase: string): string => {
  return `import { Create${pascalCase}DTO } from '../dtos/create-${kebabCase}.dto'
import { ${pascalCase} } from '../models/${kebabCase}.model'

export interface ${pascalCase}Service {
  get${pascalCase}s: () => Promise<${pascalCase}[]>
  get${pascalCase}: (uuid: string) => Promise<${pascalCase}>
  create${pascalCase}: (dto: Create${pascalCase}DTO) => Promise<${pascalCase}>
  update${pascalCase}: (uuid: string, dto: Create${pascalCase}DTO) => Promise<${pascalCase}>
  delete${pascalCase}: (uuid: string) => Promise<void>
}

export class ${pascalCase}DefaultService implements ${pascalCase}Service {
  async get${pascalCase}s (): Promise<${pascalCase}[]> {
    return await ${pascalCase}.find({
      withDeleted: true,
      relations: ['manager', 'departments']
    })
  }

  async get${pascalCase} (uuid: string): Promise<${pascalCase}> {
    return await ${pascalCase}.findOneOrFail({
      withDeleted: true,
      where: { uuid },
      relations: ['manager', 'departments', 'departments.departmentStaff']
    })
  }

  async create${pascalCase} (dto: Create${pascalCase}DTO): Promise<${pascalCase}> {
    const ${camelCase} = ${pascalCase}.create(dto)

    await ${camelCase}.save()

    return await this.get${pascalCase}(${camelCase}.uuid)
  }

  async update${pascalCase} (uuid: string, dto: Create${pascalCase}DTO): Promise<${pascalCase}> {
    const ${camelCase} = await this.get${pascalCase}(uuid)

    Object.assign(${camelCase}, dto)

    return await ${camelCase}.save()
  }

  async delete${pascalCase} (uuid: string): Promise<void> {
    const ${camelCase} = await this.get${pascalCase}(uuid)

    await ${camelCase}.softRemove()
  }
}
`
}
