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
}: {
  block: ContentBlock
  index: number
}) {
  const renderBlock = () => {
    switch (block.type) {
      case 'full-image':
        return <FullImageBlock block={block} />
      case 'image-text':
        return <ImageTextBlock block={block} index={index} />
      case 'statement':
        return <StatementBlock block={block} />
      case 'comparison':
        return <ComparisonBlock block={block} />
      case 'gallery-2':
        return <Gallery2Block block={block} />
      case 'gallery-3':
        return <Gallery3Block block={block} />
      case 'slider':
        return <SliderBlock block={block} />
      case 'video':
        return <VideoBlock block={block} />
      case 'horizontal-scroll':
        return <HorizontalScrollBlock block={block} />
      case 'timeline':
        return <TimelineBlock block={block} />
      default:
        return null
    }
  }
  const content = renderBlock()

  const wrapperStyle: React.CSSProperties = {}
  if (block.textColor) {
    wrapperStyle.color = block.textColor
    ;(wrapperStyle as any)['--block-text-color'] = block.textColor
  }

  if (block.textColor && content) {
    return (
      <div style={wrapperStyle}>
        {content}
      </div>
    )
  }

  return content
}
