import type { ContentBlock } from '../../data/inspirations'

export interface InspirationContentBlocksProps {
  blocks: ContentBlock[]
}

export function InspirationContentBlocks({ blocks }: InspirationContentBlocksProps) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 md:px-12 lg:py-24">
      <div className="flex flex-col gap-12 md:gap-16">
        {blocks.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2 key={index} className="mt-8 text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
                {block.content}
              </h2>
            )
          }
          if (block.type === 'paragraph') {
            return (
              <p
                key={index}
                className="text-lg font-light leading-normal text-white/70 md:text-2xl md:leading-[1.6] [&_b]:font-normal [&_b]:text-white [&_strong]:font-normal [&_strong]:text-white [&_em]:italic [&_i]:italic"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )
          }
          if (block.type === 'image') {
            return (
              <figure key={index} className="my-12">
                <div className="overflow-hidden bg-white/5">
                  <img src={block.src} alt={block.alt} className="w-full object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          }
          return null
        })}
      </div>
    </main>
  )
}
