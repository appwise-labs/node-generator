import fs from 'fs/promises'
import { exit } from 'process'
import { controller } from './templates/crud/controller'
import { dto } from './templates/crud/dto'
import { model } from './templates/crud/model'
import { router } from './templates/crud/router'
import { service } from './templates/crud/service'
import { transformer } from './templates/crud/transformer'
import { index } from './templates/crud/index'
import { isKebabCase, toCamelCase, toPascalCase } from './utils'

async function checkPreconditions (base: string, entityName: string): Promise<void> {
  if (entityName == null) throw new Error('Entity name is required')

  if (!isKebabCase(entityName)) throw new Error(`Invalid kebab case: ${entityName}`)

  await fs.stat(base)
    .catch(() => { throw new Error(`Base directory '${base}' does not exist`) })

  const result = await fs.stat(`${base}/${entityName}`).catch(() => null)

  if (result != null) throw new Error(`Entity "${entityName}" already exists`)
}

async function copyTemplate (base: string, entityName: string): Promise<void> {
  const placeFile = async (options: {
    dir?: string
    name: string
    template: (kebabCase: string, pascalCase: string, camelCase: string) => string
  }): Promise<void> => {
    const dir = options.dir == null
      ? `${base}/${entityName}`
      : `${base}/${entityName}/${options.dir}`

    if (options.dir != null) await fs.mkdir(dir)

    const content = options.template(entityName, toPascalCase(entityName), toCamelCase(entityName))

    await fs.writeFile(`${dir}/${options.name}`, content)
  }

  await fs.mkdir(`${base}/${entityName}`)

  await placeFile({ dir: 'controllers', name: `${entityName}.controller.ts`, template: controller })
  await placeFile({ dir: 'dtos', name: `create-${entityName}.dto.ts`, template: dto })
  await placeFile({ dir: 'models', name: `${entityName}.model.ts`, template: model })
  await placeFile({ dir: 'routers', name: `${entityName}.router.ts`, template: router })
  await placeFile({ dir: 'services', name: `${entityName}.service.ts`, template: service })
  await placeFile({ dir: 'transformers', name: `${entityName}.transformer.ts`, template: transformer })
  await placeFile({ name: 'index.ts', template: index })
}

async function createComponent (): Promise<void> {
  const entityName = process.argv[2]

  const base = 'src/components'

  await checkPreconditions(base, entityName)

  await copyTemplate(base, entityName)
}

void createComponent()
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('\x1b[31mError:', err.message)
    exit(1)
  })
