import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { CategoryService } from '../category.service'

@ValidatorConstraint({ name: 'CategorySlugIsUnique', async: true })
export class CategorySlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const id = validationArguments.object['id']
    const category = await this.categoryService.getBySlug(text)
    if (category) {
      if (id) {
        if (id === category.id) {
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
