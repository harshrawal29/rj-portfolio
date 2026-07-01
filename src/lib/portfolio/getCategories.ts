import type { Category } from '../../types/portfolio'
import { fetchManifest } from './fetchManifest'

export async function getCategories(): Promise<Category[]> {
  const manifest = await fetchManifest()
  return [...manifest.categories].sort((a, b) => a.order - b.order)
}
