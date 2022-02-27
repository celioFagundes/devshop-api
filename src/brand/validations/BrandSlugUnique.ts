import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { BrandService } from '../brand.service'

@ValidatorConstraint({ name: 'BrandSlugIsUnique', async: true })
export class BrandSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly brandService: BrandService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const id = validationArguments.object['id']
    const brand = await this.brandService.getBySlug(text)
    if (brand) {
      if (id) {
        if (id === brand.id) {
          return true
        }
      }
      return false
    }
    return true
  }
  defaultMessage(args: ValidationArguments): string {
    return 'Slug already exists'
  }
}
