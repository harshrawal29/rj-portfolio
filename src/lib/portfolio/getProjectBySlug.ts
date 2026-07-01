import type { Project } from '../../types/portfolio'
import { getCachedProject, setCachedProject } from './cache'
import { fetchJson } from './fetchJson'
import { projectJsonPath } from './paths'

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const cached = getCachedProject(slug)
  if (cached) {
    return cached
  }

  try {
    const project = await fetchJson<Project>(projectJsonPath(slug))
    setCachedProject(slug, project)
    return project
  } catch {
    return null
  }
}
