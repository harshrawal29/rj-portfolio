import type { Category } from '../../types/portfolio'
import { sanityClient } from '../sanity'

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    order
  }`
  
  try {
    const category = await sanityClient.fetch(query, { slug })
    return category || null
  } catch (error) {
    console.error(`Error fetching category ${slug} from Sanity`, error)
    return null
  }
}
