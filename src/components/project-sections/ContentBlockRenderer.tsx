import type { ContentBlock } from '../../types/portfolio'
import FullImageBlock from './FullImageBlock'
import ImageTextBlock from './ImageTextBlock'
import StatementBlock from './StatementBlock'
import ComparisonBlock from './ComparisonBlock'
import Gallery2Block from './Gallery2Block'
import Gallery3Block from './Gallery3Block'
import SliderBlock from './SliderBlock'
import VideoBlock from './VideoBlock'
import HorizontalScrollBlock from './HorizontalScrollBlock'
import TimelineBlock from './TimelineBlock'

export default function ContentBlockRenderer({
  block,
  index,
  projectSlug,
}: {
  block: ContentBlock
  index: number
  projectSlug: string
}) {
  const basePath = `/projects/${projectSlug}/`
  const resolve = (path: string) => path.startsWith('/') ? path : `${basePath}${path}`

  // Clone the block to resolve all paths automatically
  const resolvedBlock = JSON.parse(JSON.stringify(block)) as ContentBlock

  if ('src' in resolvedBlock && typeof resolvedBlock.src === 'string') {
    resolvedBlock.src = resolve(resolvedBlock.src)
  }
  if ('poster' in resolvedBlock && typeof resolvedBlock.poster === 'string') {
    resolvedBlock.poster = resolve(resolvedBlock.poster)
  }
  if ('images' in resolvedBlock && Array.isArray(resolvedBlock.images)) {
    resolvedBlock.images = resolvedBlock.images.map(img => ({ ...img, src: resolve(img.src) }))
  }
  if ('slides' in resolvedBlock && Array.isArray(resolvedBlock.slides)) {
    resolvedBlock.slides = resolvedBlock.slides.map(slide => ({ ...slide, src: resolve(slide.src) }))
  }
  if ('before' in resolvedBlock && typeof resolvedBlock.before === 'string') {
    resolvedBlock.before = resolve(resolvedBlock.before)
  }
  if ('after' in resolvedBlock && typeof resolvedBlock.after === 'string') {
    resolvedBlock.after = resolve(resolvedBlock.after)
  }

  switch (resolvedBlock.type) {
    case 'full-image':
      return <FullImageBlock block={resolvedBlock} />
    case 'image-text':
      return <ImageTextBlock block={resolvedBlock} index={index} />
    case 'statement':
      return <StatementBlock block={resolvedBlock} />
    case 'comparison':
      return <ComparisonBlock block={resolvedBlock} />
    case 'gallery-2':
      return <Gallery2Block block={resolvedBlock} />
    case 'gallery-3':
      return <Gallery3Block block={resolvedBlock} />
    case 'slider':
      return <SliderBlock block={resolvedBlock} />
    case 'video':
      return <VideoBlock block={resolvedBlock} />
    case 'horizontal-scroll':
      return <HorizontalScrollBlock block={resolvedBlock} />
    case 'timeline':
      return <TimelineBlock block={resolvedBlock} />
    default:
      return null
  }
}
