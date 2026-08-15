import type { Category } from '../../types/portfolio'
import { sanityClient } from '../sanity'

export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(order asc) {
    title,
    "slug": slug.current,
    order
  }`
  
  try {
    const categories = await sanityClient.fetch(query)
    return categories
  } catch (error) {
    console.error("Error fetching categories from Sanity", error)
    return []
  }
}
