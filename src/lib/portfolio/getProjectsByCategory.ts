import type { CategorySlug, ProjectSummary } from '../../types/portfolio'
import { getProjects } from './getProjects'

export async function getProjectsByCategory(
  categorySlug: CategorySlug,
): Promise<ProjectSummary[]> {
  const projects = await getProjects()
  const targetSlug = categorySlug.toLowerCase()
  return projects
    .filter((project) => project.category?.toLowerCase() === targetSlug)
    .sort((a, b) => a.order - b.order)
}
