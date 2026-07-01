import type { Category, CategorySlug } from '../../types/portfolio'
import { fetchManifest } from './fetchManifest'

export async function getCategoryBySlug(slug: CategorySlug): Promise<Category | null> {
  const manifest = await fetchManifest()
  return manifest.categories.find((category) => category.slug === slug) ?? null
}
