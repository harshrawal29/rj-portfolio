import type { Project, ProjectsManifest } from '../../types/portfolio'

let manifestCache: ProjectsManifest | null = null
const projectCache = new Map<string, Project>()

export function getCachedManifest(): ProjectsManifest | null {
  return manifestCache
}

export function setCachedManifest(manifest: ProjectsManifest): void {
  manifestCache = manifest
}

export function getCachedProject(slug: string): Project | undefined {
  return projectCache.get(slug)
}

export function setCachedProject(slug: string, project: Project): void {
  projectCache.set(slug, project)
}

export function clearPortfolioCache(): void {
  manifestCache = null
  projectCache.clear()
}
