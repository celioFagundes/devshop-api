import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { S3 } from 'src/utils/s3'
import { getRepository, Repository } from 'typeorm'
import { Product } from './product.entity'
import * as sharp from 'sharp'
import { Category } from 'src/category/category.entity'
import { Brand } from '../brand/brand.entity'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3,
  ) {}
  async getAll(): Promise<Product[]> {
    return this.productRepository.find({})
  }

  async getByCategory(categorySlug: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOne({
      where: [{ slug: categorySlug }],
    })
    return this.productRepository.find({ where: [{ category: category.id }] })
  }
  async getByBrand(brandSlug: string): Promise<Product[]> {
    const brand = await this.brandRepository.findOne({
      where: [{ slug: brandSlug }],
    })
    return this.productRepository.find({ where: [{ brand: brand.id }] })
  }
  async getById(id: string): Promise<Product> {
    return this.productRepository.findOne(id)
  }
  async getBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({ where: [{ slug }] })
  }
  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }
  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category,
      brand: input.brand,
      sizeType: input.sizeType,
      voltage: input.voltage,
      variations: input.variations,
    })
    return input
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
  async uploadProductImage(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string,
  ): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }
    const stream = createReadStream().pipe(sharp().resize({ width: 500 }))
    const url = await this.s3.upload(
      stream,
      mimetype,
      'devshop-assets-2022',
      id + '-' + filename,
    )
    product.images.push(url)
    await this.productRepository.update(id, {
      images: product.images,
    })
    return true
  }
  async removeProductImage(id: string, url: string): Promise<boolean> {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }
    product.images = product.images.filter(imgUrl => imgUrl !== url)
    const filename = url.split('.com/')[1]
    await this.s3.deleteObject('devshop-assets-2022', filename)
    await this.productRepository.update(product.id, {
      images: product.images,
    })
    return true
  }
}
