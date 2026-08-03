import type { ProjectSummary } from '../../types/portfolio'
import { sanityClient } from '../sanity'

export async function getProjects(): Promise<ProjectSummary[]> {
  const query = `*[_type == "project"] | order(order asc) {
    title,
    "slug": slug.current,
    "category": category->slug.current,
    year,
    "cover": coverImage.asset->url,
    summary,
    client,
    services,
    eyebrow,
    order
  }`
  
  try {
    const projects = await sanityClient.fetch(query)
    return projects
  } catch (error) {
    console.error("Error fetching projects from Sanity", error)
    return []
  }
}
