import type { CategorySlug, ProjectSummary } from '../../types/portfolio'
import { getProjects } from './getProjects'

export async function getProjectsByCategory(
  categorySlug: CategorySlug,
): Promise<ProjectSummary[]> {
  const projects = await getProjects()
  return projects
    .filter((project) => project.category === categorySlug)
    .sort((a, b) => a.order - b.order)
}
