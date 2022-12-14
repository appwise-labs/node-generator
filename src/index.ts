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
import { dtoDocs } from './templates/docs/dto'
import { parameterDocs } from './templates/docs/parameter'
import { indexDocs } from './templates/docs/index.path'
import { detailDocs } from './templates/docs/detail.path'
import { transformerDocs } from './templates/docs/transformer'

export class CaseTransformer {
  constructor (private readonly entityName: string) {}

  get kebabCase (): string {
    return this.entityName
  }

  get pascalCase (): string {
    return toPascalCase(this.entityName)
  }

  get camelCase (): string {
    return toCamelCase(this.entityName)
  }

  get readableCase (): string {
    return this.kebabCase.replace(/-/g, ' ')
  }
}

interface PlaceFileOptions {
  base: string
  dir?: string
  name: string
  entityName: string
  template: (caseTransformer: CaseTransformer) => string
}

async function placeFile (options: PlaceFileOptions): Promise<void> {
  const dir = options.dir == null
    ? `${options.base}/${options.entityName}s`
    : `${options.base}/${options.entityName}s/${options.dir}`

  if (options.dir != null) await fs.mkdir(dir).catch(() => { /* ignore */ })

  const content = options.template(new CaseTransformer(options.entityName))

  await fs.writeFile(`${dir}/${options.name}`, content)
}

async function checkPreconditions (base: string, entityName: string): Promise<void> {
  if (entityName == null) throw new Error('Entity name is required')

  if (!isKebabCase(entityName)) throw new Error(`Invalid kebab case: ${entityName}`)

  await fs.stat(base)
    .catch(() => { throw new Error(`Base directory '${base}' does not exist`) })

  const result = await fs.stat(`${base}/${entityName}s`).catch(() => null)

  if (result != null) throw new Error(`Entity "${entityName}" already exists`)
}

async function copyTemplate (base: string, entityName: string): Promise<void> {
  await checkPreconditions(base, entityName)

  const options = { base, entityName }

  await fs.mkdir(`${base}/${entityName}s`)

  await placeFile({ ...options, dir: 'controllers', name: `${entityName}.controller.ts`, template: controller })
  await placeFile({ ...options, dir: 'dtos', name: `create-${entityName}.dto.ts`, template: dto })
  await placeFile({ ...options, dir: 'models', name: `${entityName}.model.ts`, template: model })
  await placeFile({ ...options, dir: 'routers', name: `${entityName}.router.ts`, template: router })
  await placeFile({ ...options, dir: 'services', name: `${entityName}.service.ts`, template: service })
  await placeFile({ ...options, dir: 'transformers', name: `${entityName}.transformer.ts`, template: transformer })
  await placeFile({ ...options, name: 'index.ts', template: index })
}

async function copyDocs (base: string, entityName: string): Promise<void> {
  await checkPreconditions(base, entityName)

  const options = { base, entityName }

  await fs.mkdir(`${base}/${entityName}s`)

  await placeFile({ ...options, dir: 'dtos', name: `create-${entityName}.dto.yaml`, template: dtoDocs })
  await placeFile({ ...options, dir: 'parameters', name: `${entityName}.path.yaml`, template: parameterDocs })
  await placeFile({ ...options, dir: 'paths', name: `${entityName}s.path.yaml`, template: indexDocs })
  await placeFile({ ...options, dir: 'paths', name: `${entityName}.path.yaml`, template: detailDocs })
  await placeFile({ ...options, dir: 'transformers', name: `${entityName}.transformer.yaml`, template: transformerDocs })
}

async function createComponent (): Promise<void> {
  const entityName = process.argv[2]

  await copyTemplate('src/components', entityName)
  await copyDocs('docs', entityName)
}

void createComponent()
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('\x1b[31mError:', err.message)
    exit(1)
  })
