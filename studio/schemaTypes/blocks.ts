import {defineField, defineType} from 'sanity'

// Shared background color field for all blocks
const backgroundColorField = defineField({
  name: 'backgroundColor',
  title: 'Background Color',
  type: 'string',
  description: 'Optional CSS color value (e.g., #ffffff, var(--color-bg), bg-neutral-900)',
})

// Shared text color field for all blocks
const textColorField = defineField({
  name: 'textColor',
  title: 'Text Color',
  type: 'string',
  description: 'Optional CSS color value for text (e.g., #ffffff, #111111, #ff5722, rgba(0,0,0,0.8))',
})

export const fullImageBlock = defineType({
  name: 'fullImageBlock',
  title: 'Full Width Image',
  type: 'object',
  fields: [
    backgroundColorField,
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Full Image Block',
        media,
      }
    },
  },
})

export const imageTextBlock = defineType({
  name: 'imageTextBlock',
  title: 'Image & Text',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Text on Left, Image on Right', value: 'text-image'},
          {title: 'Image on Left, Text on Right', value: 'image-text'},
          {title: 'Text only (Two Columns)', value: 'text-text'},
          {title: 'Media only (Two Columns)', value: 'image-image'},
        ],
      },
      initialValue: 'text-image',
    }),
    defineField({
      name: 'media', 
      title: 'Left Media (Image/GIF/Video)', 
      type: 'file', 
      options: { accept: 'image/*,video/*' },
      hidden: ({ parent }) => parent?.variant === 'text-text' || parent?.variant === 'text-image'
    }),
    defineField({
      name: 'alt', 
      title: 'Left Alt Text', 
      type: 'string',
      hidden: ({ parent }) => parent?.variant === 'text-text' || parent?.variant === 'text-image'
    }),
    defineField({
      name: 'mediaRight', 
      title: 'Right Media (Image/GIF/Video)', 
      type: 'file', 
      options: { accept: 'image/*,video/*' },
      hidden: ({ parent }) => parent?.variant !== 'image-image' && parent?.variant !== 'text-image'
    }),
    defineField({
      name: 'altRight', 
      title: 'Right Alt Text', 
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'image-image' && parent?.variant !== 'text-image'
    }),
    defineField({
      name: 'label', 
      title: 'Left Label (Eyebrow)', 
      type: 'string',
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text'
    }),
    defineField({
      name: 'heading', 
      title: 'Left Heading', 
      type: 'string',
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text'
    }),
    defineField({
      name: 'body', 
      title: 'Left Body', 
      type: 'array',
      of: [{type: 'block'}],
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text'
    }),
    defineField({
      name: 'textSize',
      title: 'Body Text Size',
      type: 'string',
      description: 'Select preset font size or choose Custom Size',
      options: {
        list: [
          { title: 'Default (Responsive 16-18px)', value: 'default' },
          { title: '10px', value: '10px' },
          { title: '12px', value: '12px' },
          { title: '14px', value: '14px' },
          { title: '16px', value: '16px' },
          { title: '18px', value: '18px' },
          { title: '20px', value: '20px' },
          { title: '22px', value: '22px' },
          { title: '24px', value: '24px' },
          { title: '28px', value: '28px' },
          { title: '32px', value: '32px' },
          { title: 'Custom Size...', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text'
    }),
    defineField({
      name: 'customTextSize',
      title: 'Custom Text Size',
      type: 'string',
      description: 'Enter a custom size (e.g., 15px, 1.25rem, 26px)',
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text' || parent?.textSize !== 'custom',
    }),
    defineField({
      name: 'lineHeight',
      title: 'Body Line Spacing',
      type: 'string',
      description: 'Select line spacing (e.g., 1.1 - 1.3 for large text, 1.5 - 1.7 for small text)',
      options: {
        list: [
          { title: 'Default (1.7)', value: 'default' },
          { title: '1.0 (Single)', value: '1.0' },
          { title: '1.1 (Very Tight)', value: '1.1' },
          { title: '1.2 (Tight)', value: '1.2' },
          { title: '1.3 (Snug)', value: '1.3' },
          { title: '1.4 (Compact)', value: '1.4' },
          { title: '1.5 (Normal)', value: '1.5' },
          { title: '1.6 (Comfortable)', value: '1.6' },
          { title: '1.8 (Relaxed)', value: '1.8' },
          { title: '2.0 (Double)', value: '2.0' },
          { title: 'Custom...', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text'
    }),
    defineField({
      name: 'customLineHeight',
      title: 'Custom Line Spacing',
      type: 'string',
      description: 'Enter custom line height (e.g., 1.25, 1.35, 36px)',
      hidden: ({ parent }) => parent?.variant === 'image-image' || parent?.variant === 'image-text' || parent?.lineHeight !== 'custom',
    }),
    
    // Right side text fields (used for text-text and image-text)
    defineField({
      name: 'labelRight', 
      title: 'Right Label (Eyebrow)', 
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text'
    }),
    defineField({
      name: 'headingRight', 
      title: 'Right Heading', 
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text'
    }),
    defineField({
      name: 'bodyRight', 
      title: 'Right Body', 
      type: 'array',
      of: [{type: 'block'}],
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text'
    }),
    defineField({
      name: 'textSizeRight',
      title: 'Right Body Text Size',
      type: 'string',
      description: 'Select preset font size or choose Custom Size',
      options: {
        list: [
          { title: 'Default (Responsive 16-18px)', value: 'default' },
          { title: '10px', value: '10px' },
          { title: '12px', value: '12px' },
          { title: '14px', value: '14px' },
          { title: '16px', value: '16px' },
          { title: '18px', value: '18px' },
          { title: '20px', value: '20px' },
          { title: '22px', value: '22px' },
          { title: '24px', value: '24px' },
          { title: '28px', value: '28px' },
          { title: '32px', value: '32px' },
          { title: 'Custom Size...', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text'
    }),
    defineField({
      name: 'customTextSizeRight',
      title: 'Right Body Custom Text Size',
      type: 'string',
      description: 'Enter a custom size (e.g., 15px, 1.25rem, 26px)',
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text' || parent?.textSizeRight !== 'custom',
    }),
    defineField({
      name: 'lineHeightRight',
      title: 'Right Body Line Spacing',
      type: 'string',
      description: 'Select line spacing (e.g., 1.1 - 1.3 for large text, 1.5 - 1.7 for small text)',
      options: {
        list: [
          { title: 'Default (1.7)', value: 'default' },
          { title: '1.0 (Single)', value: '1.0' },
          { title: '1.1 (Very Tight)', value: '1.1' },
          { title: '1.2 (Tight)', value: '1.2' },
          { title: '1.3 (Snug)', value: '1.3' },
          { title: '1.4 (Compact)', value: '1.4' },
          { title: '1.5 (Normal)', value: '1.5' },
          { title: '1.6 (Comfortable)', value: '1.6' },
          { title: '1.8 (Relaxed)', value: '1.8' },
          { title: '2.0 (Double)', value: '2.0' },
          { title: 'Custom...', value: 'custom' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text'
    }),
    defineField({
      name: 'customLineHeightRight',
      title: 'Right Body Custom Line Spacing',
      type: 'string',
      description: 'Enter custom line height (e.g., 1.25, 1.35, 36px)',
      hidden: ({ parent }) => parent?.variant !== 'text-text' && parent?.variant !== 'image-text' || parent?.lineHeightRight !== 'custom',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      headingRight: 'headingRight',
      media: 'media',
      mediaRight: 'mediaRight',
    },
    prepare({heading, headingRight, media, mediaRight}) {
      return {
        title: heading || headingRight ? `Image/Text: ${heading || headingRight}` : 'Image & Text Block',
        media: media || mediaRight,
      }
    },
  },
})

export const statementBlock = defineType({
  name: 'statementBlock',
  title: 'Statement (Large Text)',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({
      name: 'text',
      title: 'Statement Text',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'text'},
    prepare({title}) {
      return {title: title ? `Statement: ${title.substring(0, 30)}...` : 'Statement Block'}
    },
  },
})

export const comparisonBlock = defineType({
  name: 'comparisonBlock',
  title: 'Before/After Comparison',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({name: 'beforeImage', title: 'Before Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'afterImage', title: 'After Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'beforeLabel', title: 'Before Label', type: 'string', initialValue: 'Before'}),
    defineField({name: 'afterLabel', title: 'After Label', type: 'string', initialValue: 'After'}),
  ],
  preview: {
    select: {media: 'afterImage'},
    prepare({media}) {
      return {title: 'Comparison Block', media}
    },
  },
})

export const gallery2Block = defineType({
  name: 'gallery2Block',
  title: '2-Image Gallery',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({name: 'image1', title: 'Image 1', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt1', title: 'Image 1 Alt', type: 'string'}),
    defineField({name: 'image2', title: 'Image 2', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt2', title: 'Image 2 Alt', type: 'string'}),
  ],
  preview: {
    select: {media: 'image1'},
    prepare({media}) {
      return {title: '2-Image Gallery', media}
    },
  },
})

export const gallery3Block = defineType({
  name: 'gallery3Block',
  title: '3-Image / Video Gallery',
  type: 'object',
  fields: [
    backgroundColorField,
    defineField({
      name: 'images',
      title: 'Media Items (Images / Videos)',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'media',
              title: 'Media (Image / Video / GIF)',
              type: 'file',
              description: 'Upload an image (.jpg, .png, .webp, .gif) or video (.mp4, .webm, .mov)',
              options: {accept: 'image/*,video/*'},
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({name: 'metadata', title: 'Metadata', type: 'string'}),
          ],
          preview: {
            select: {
              title: 'title',
              alt: 'alt',
              media: 'media',
            },
            prepare({title, alt, media}) {
              return {
                title: title || alt || 'Gallery Item',
                media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {title: '3-Image / Video Gallery'}
    },
  },
})

export const sliderBlock = defineType({
  name: 'sliderBlock',
  title: 'Image Slider',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'slide',
          fields: [
            defineField({name: 'image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'alt', type: 'string'}),
            defineField({name: 'caption', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Image Slider'}
    },
  },
})

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  fields: [
    backgroundColorField,
    defineField({name: 'url', title: 'Video URL (mp4 or Youtube/Vimeo)', type: 'url'}),
    defineField({name: 'videoFile', title: 'Video File Upload (.mp4, .webm)', type: 'file', options: {accept: 'video/*'}}),
    defineField({name: 'poster', title: 'Poster Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'autoPlay', title: 'Autoplay', type: 'boolean', initialValue: true}),
    defineField({name: 'controls', title: 'Show Controls', description: 'Enable or disable playback controls on the video', type: 'boolean', initialValue: true}),
  ],
  preview: {
    select: {title: 'url', media: 'poster'},
    prepare({title, media}) {
      return {title: `Video: ${title || ''}`, media}
    },
  },
})

export const timelineBlock = defineType({
  name: 'timelineBlock',
  title: 'Timeline / Steps',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'step',
          fields: [
            defineField({name: 'number', title: 'Step Number/Icon', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Timeline Block'}
    },
  },
})

export const horizontalScrollBlock = defineType({
  name: 'horizontalScrollBlock',
  title: 'Horizontal Scroll Images',
  type: 'object',
  fields: [
    backgroundColorField,
    textColorField,
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'scrollImage',
          fields: [
            defineField({name: 'image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'alt', type: 'string'}),
            defineField({name: 'caption', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Horizontal Scroll Block'}
    },
  },
})

export const blockTypes = [
  fullImageBlock,
  imageTextBlock,
  statementBlock,
  comparisonBlock,
  gallery2Block,
  gallery3Block,
  sliderBlock,
  videoBlock,
  timelineBlock,
  horizontalScrollBlock,
]
