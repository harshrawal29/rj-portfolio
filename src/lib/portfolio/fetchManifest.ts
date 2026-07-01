import type { ProjectsManifest } from '../../types/portfolio'
import { getCachedManifest, setCachedManifest } from './cache'
import { fetchJson } from './fetchJson'
import { PROJECTS_BASE_PATH } from './paths'

export async function fetchManifest(): Promise<ProjectsManifest> {
  const cached = getCachedManifest()
  if (cached) {
    return cached
  }

  const manifest = await fetchJson<ProjectsManifest>(`${PROJECTS_BASE_PATH}/manifest.json`)
  setCachedManifest(manifest)
  return manifest
}
