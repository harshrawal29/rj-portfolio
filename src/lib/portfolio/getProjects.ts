import type { ProjectSummary } from '../../types/portfolio'
import { fetchManifest } from './fetchManifest'
import { getProjectBySlug } from './getProjectBySlug'

export async function getProjects(): Promise<ProjectSummary[]> {
  const manifest = await fetchManifest()
  const projects = await Promise.all(
    manifest.projects.map(async (manifestProject) => {
      const project = await getProjectBySlug(manifestProject.slug)
      return project ?? manifestProject
    }),
  )

  return projects.sort((a, b) => a.order - b.order)
}
