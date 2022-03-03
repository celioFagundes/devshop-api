import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { S3 } from 'src/utils/s3'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import * as sharp from 'sharp'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private s3: S3,
  ) {}
  async getAll(): Promise<Product[]> {
    return this.productRepository.find()
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
    const stream = createReadStream().pipe(sharp().resize(300))
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
