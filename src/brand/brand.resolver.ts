import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BrandMapper } from './brand.mapper'
import { BrandService } from './brand.service'
import { BrandPublic } from './dto/brand'
import { BrandCreateInput } from './dto/brand-create.input'
import { BrandUpdateInput } from './dto/brand-update.input'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../utils/jwt-auth.guard'

@Resolver(of => BrandPublic)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(returns => [BrandPublic], { name: 'getAllBrands' })
  async getAllBrands(): Promise<BrandPublic[]> {
    return await this.brandService.getAll()
  }
  @Query(returns => BrandPublic, { name: 'getBrandById' })
  async getBrandById(@Args('id') id: string): Promise<BrandPublic> {
    return await this.brandService.getById(id)
  }
  @Query(returns => BrandPublic, { name: 'getBrandBySlug' })
  async getBrandBySlug(@Args('slug') slug: string): Promise<BrandPublic> {
    return await this.brandService.getBySlug(slug)
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => BrandPublic, { name: 'panelCreateBrand' })
  async createBrand(
    @Args('input') input: BrandCreateInput,
  ): Promise<BrandPublic> {
    return this.brandService.create(BrandMapper.toEntity(input))
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => BrandPublic, { name: 'panelUpdateBrand' })
  async updateBrand(
    @Args('input') input: BrandUpdateInput,
  ): Promise<BrandPublic> {
    return BrandMapper.fromEntityToPublic(
      await this.brandService.update(BrandMapper.fromUpdateToEntity(input)),
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelDeleteBrand' })
  async deleteBrand(@Args('id') input: string): Promise<boolean> {
    return this.brandService.delete(input)
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelUploadBrandLogo' })
  async uploadBrandLogo(
    @Args('id') id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = await file
    return await this.brandService.uploadLogo(
      id,
      createReadStream,
      filename,
      mimetype,
    )
  }
  @UseGuards(AuthGuard)
  @Mutation(returns => Boolean, { name: 'panelRemoveBrandLogo' })
  async removeBrandLogo(@Args('id') id: string): Promise<boolean> {
    return await this.brandService.removeBrandLogo(id)
  }
}
