import { CATEGORY_SLUGS, type CategorySlug } from '../../types/portfolio'

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value)
}
