import type { CategorySlug } from '../../types/portfolio'

export const PROJECTS_BASE_PATH = '/projects'

export function projectBasePath(slug: string): string {
  return `${PROJECTS_BASE_PATH}/${slug}`
}

export function projectJsonPath(slug: string): string {
  return `${projectBasePath(slug)}/project.json`
}

export function projectWriteupPath(slug: string): string {
  return `${projectBasePath(slug)}/writeup.pdf`
}

export function projectSectionPath(
  slug: string,
  section: string,
  filename?: string,
): string {
  const base = `${projectBasePath(slug)}/${section}`
  return filename ? `${base}/${filename}` : base
}

export function categoryPath(slug: CategorySlug): string {
  return `${PROJECTS_BASE_PATH}?category=${slug}`
}
