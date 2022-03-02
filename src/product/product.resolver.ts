import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductUpdateInput } from './dto/product-update.input'
import { Product } from './product.entity'
import { ProductMapper } from './product.mapper'
import { ProductService } from './product.service'

@Resolver(of => ProductPublic)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(returns => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    const products = await this.productService.getAll()
    return products.map(ProductMapper.fromEntityToPublic)
  }
  @Query(returns => ProductPublic, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.getById(id),
    )
  }
  @Query(returns => ProductPublic, { name: 'getProductBySlug' })
  async getProductBySlug(@Args('slug') slug: string): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.getBySlug(slug),
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => ProductPublic, { name: 'panelCreateProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput,
  ): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.create(ProductMapper.toEntity(input)),
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => ProductPublic, { name: 'panelUpdateProduct' })
  async updateProduct(
    @Args('input') input: ProductUpdateInput,
  ): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.update(ProductMapper.fromUpdateToEntity(input)),
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteProduct' })
  async deleteProduct(@Args('id') input: string): Promise<boolean> {
    return this.productService.delete(input)
  }
}
