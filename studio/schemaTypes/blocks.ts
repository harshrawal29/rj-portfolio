import {defineField, defineType} from 'sanity'

// Shared background color field for all blocks
const backgroundColorField = defineField({
  name: 'backgroundColor',
  title: 'Background Color',
  type: 'string',
  description: 'Optional CSS color value (e.g., #ffffff, var(--color-bg), bg-neutral-900)',
})

export const fullImageBlock = defineType({
  name: 'fullImageBlock',
  title: 'Full Width Image',
  type: 'object',
  fields: [
    backgroundColorField,
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
  preview: {
    select: {
      title: 'caption',
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
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Text on Left, Image on Right', value: 'text-image'},
          {title: 'Image on Left, Text on Right', value: 'image-text'},
          {title: 'Text only (Two Columns)', value: 'text-text'},
        ],
      },
      initialValue: 'text-image',
    }),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
    defineField({name: 'label', title: 'Left Label (Eyebrow)', type: 'string'}),
    defineField({name: 'heading', title: 'Left Heading', type: 'string'}),
    defineField({name: 'body', title: 'Left Body', type: 'text'}),
    
    // For text-text variant
    defineField({name: 'labelRight', title: 'Right Label', type: 'string'}),
    defineField({name: 'headingRight', title: 'Right Heading', type: 'string'}),
    defineField({name: 'bodyRight', title: 'Right Body', type: 'text'}),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title ? `Image/Text: ${title}` : 'Image & Text Block',
        media,
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
    defineField({
      name: 'text',
      title: 'Statement Text',
      type: 'text',
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
  title: '3-Image Gallery',
  type: 'object',
  fields: [
    backgroundColorField,
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({name: 'image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'alt', type: 'string'}),
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'description', type: 'string'}),
            defineField({name: 'metadata', type: 'string'}),
          ],
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {title: '3-Image Gallery'}
    },
  },
})

export const sliderBlock = defineType({
  name: 'sliderBlock',
  title: 'Image Slider',
  type: 'object',
  fields: [
    backgroundColorField,
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
    defineField({name: 'poster', title: 'Poster Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'autoPlay', title: 'Autoplay', type: 'boolean', initialValue: true}),
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
            defineField({name: 'description', title: 'Description', type: 'text'}),
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
