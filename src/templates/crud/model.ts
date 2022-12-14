import { CaseTransformer } from '../..'

export const model = (transformer: CaseTransformer): string => {
  return `import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ${transformer.pascalCase} extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @CreateDateColumn({ precision: 3 })
  createdAt: Date

  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date

  @DeleteDateColumn({ precision: 3 })
  deletedAt: Date | null
}
`
}
