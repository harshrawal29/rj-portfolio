export const CATEGORY_SLUGS = [
  'album-cover-design',
  'packaging-design',
  'ui-ux-design',
  'branding',
  'advertising',
  'motion'
] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

export const PROJECT_SECTION_TYPES = [
  'artwork',
  'mockups',
  'moodboard',
  'storyboards',
  'video'
] as const

export type ProjectSectionType = (typeof PROJECT_SECTION_TYPES)[number]

export interface Category {
  title: string
  slug: CategorySlug
  description: string
  coverImage: string
  order: number
}

export interface ProjectSection {
  type: ProjectSectionType
  title?: string
  assets: Array<{
    filename: string
    alt?: string
    span?: 'full' | 'half'
  }>
}

export interface ProjectSummary {
  title: string
  slug: string
  category: CategorySlug
  year: number | string
  cover: string
  summary: string
  client?: string
  services?: string[]
  eyebrow?: string
  order: number
}

export interface Project extends ProjectSummary {
  writeup: string
  editorialStory?: string
  challenge?: string
  approach?: string
  outcome?: string
  sections: ProjectSection[]
  contentBlocks?: ContentBlock[]
}

export type ContentBlock = 
  | FullImageBlock
  | ImageTextBlock
  | StatementBlock
  | ComparisonBlock
  | Gallery2Block
  | Gallery3Block
  | SliderBlock
  | VideoBlock
  | TimelineBlock
  | HorizontalScrollBlock

export interface FullImageBlock {
  type: 'full-image'
  src: string
  alt?: string
  caption?: string
}

export interface ImageTextBlock {
  type: 'image-text'
  variant?: 'text-image' | 'image-text' | 'text-text'
  src?: string
  alt?: string
  label?: string
  heading: string
  body: string
  labelRight?: string
  headingRight?: string
  bodyRight?: string
}

export interface StatementBlock {
  type: 'statement'
  text: string
}

export interface ComparisonBlock {
  type: 'comparison'
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}

export interface Gallery2Block {
  type: 'gallery-2'
  images: [
    { src: string; alt?: string },
    { src: string; alt?: string }
  ]
}

export interface Gallery3Block {
  type: 'gallery-3'
  images: [
    { src: string; alt?: string; title?: string; description?: string; metadata?: string },
    { src: string; alt?: string; title?: string; description?: string; metadata?: string },
    { src: string; alt?: string; title?: string; description?: string; metadata?: string }
  ]
}

export interface SliderBlock {
  type: 'slider'
  slides: Array<{
    src: string
    alt?: string
    caption?: string
  }>
}

export interface VideoBlock {
  type: 'video'
  src: string
  poster?: string
  autoPlay?: boolean
}

export interface TimelineBlock {
  type: 'timeline'
  steps: Array<{
    number: string | number
    label: string
    description: string
  }>
}

export interface HorizontalScrollBlock {
  type: 'horizontal-scroll'
  images: Array<{
    src: string
    alt?: string
    caption?: string
  }>
}

export interface ProjectsManifest {
  categories: Category[]
  projects: ProjectSummary[]
}
