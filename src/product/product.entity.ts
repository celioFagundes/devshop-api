import { Brand } from 'src/brand/brand.entity'
import { Category } from 'src/category/category.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

interface Color {
  colorName: string
  colorCode: string
}
interface ProductVariation {
  color: Color
  size: string
  voltage: string[]
  sku: string
  price: number
  weight: number
  stock: number
}
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 250, nullable: false })
  description: string

  @Column({ length: 250, nullable: false })
  slug: string

  //Product N -> 1 Category
  @ManyToOne(type => Category, category => category.id, {
    eager: true,
  })
  category: Category
  @ManyToOne(type => Brand, brand => brand.id, {
    eager: true,
  })
  brand: Brand

  @Column({ nullable: false })
  sizeType: string
  @Column({ type: 'jsonb', nullable: false })
  variations: ProductVariation[]

  @Column({ type: 'jsonb', nullable: true })
  images: string[]
}
