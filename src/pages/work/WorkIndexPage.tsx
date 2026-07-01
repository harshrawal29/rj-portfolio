import { useLoaderData } from 'react-router-dom'
import { useRef } from 'react'
import WorkArchive from '../../components/work/WorkArchive'
import type { Category, CategorySlug, ProjectSummary } from '../../types/portfolio'
import { fetchManifest } from '../../lib/portfolio/fetchManifest'
import { getProjects } from '../../lib/portfolio/getProjects'
import FooterExperience from '../../sections/FooterExperience'

interface WorkIndexLoaderData {
  categories: Category[]
  projectCounts: Record<CategorySlug, number>
  projects: ProjectSummary[]
}

export async function loader(): Promise<WorkIndexLoaderData> {
  const [manifest, projects] = await Promise.all([fetchManifest(), getProjects()])

  const categories = [...manifest.categories].sort((a, b) => a.order - b.order)
  const projectCounts = Object.fromEntries(
    categories.map((category) => [
      category.slug,
      projects.filter((project) => project.category === category.slug).length,
    ]),
  ) as Record<CategorySlug, number>

  return { categories, projectCounts, projects }
}

export function Component() {
  const currentData = useLoaderData() as WorkIndexLoaderData | undefined
  const cachedData = useRef<WorkIndexLoaderData | null>(null)
  
  if (currentData && currentData.categories && currentData.projects) {
    cachedData.current = currentData
  }
  
  const data = currentData?.categories && currentData?.projects ? currentData : cachedData.current

  if (!data) return null

  const { categories, projectCounts, projects } = data

  return (
    <>
      <WorkArchive categories={categories} projectCounts={projectCounts} projects={projects} />
      <FooterExperience />
    </>
  )
}
