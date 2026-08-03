import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [
    {
      name: 'overview',
      title: 'Project Overview Section',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'narrative',
      title: 'Narrative Section (Challenge/Approach/Outcome)',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary (Short)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'eyebrow',
      title: 'Project Overview Heading (Eyebrow)',
      type: 'string',
      description: 'Defaults to "PROJECT OVERVIEW"',
      fieldset: 'overview',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required(),
    }),
    
    // Detailed Content
    defineField({
      name: 'editorialStory',
      title: 'Project Overview Content (Editorial Story)',
      type: 'text',
      description: 'The main narrative paragraph shown next to the project details',
      fieldset: 'overview',
    }),
    defineField({
      name: 'challengeHeading',
      title: 'Challenge Heading',
      type: 'string',
      description: 'Defaults to "Challenge"',
      fieldset: 'narrative',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge Text',
      type: 'text',
      fieldset: 'narrative',
    }),
    defineField({
      name: 'approachHeading',
      title: 'Approach Heading',
      type: 'string',
      description: 'Defaults to "Approach"',
      fieldset: 'narrative',
    }),
    defineField({
      name: 'approach',
      title: 'Approach Text',
      type: 'text',
      fieldset: 'narrative',
    }),
    defineField({
      name: 'outcomeHeading',
      title: 'Outcome Heading',
      type: 'string',
      description: 'Defaults to "Outcome"',
      fieldset: 'narrative',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome Text',
      type: 'text',
      fieldset: 'narrative',
    }),

    // Old sections format
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({name: 'type', type: 'string', title: 'Type'}),
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({
              name: 'assets',
              title: 'Assets',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'asset',
                  fields: [
                    defineField({name: 'image', type: 'image', title: 'Image', options: {hotspot: true}}),
                    defineField({name: 'alt', type: 'string', title: 'Alt text'}),
                    defineField({name: 'span', type: 'string', title: 'Span', options: {list: ['full', 'half']}}),
                  ]
                }
              ]
            })
          ]
        }
      ]
    }),

    // Flexible Content Blocks
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {type: 'fullImageBlock'},
        {type: 'imageTextBlock'},
        {type: 'statementBlock'},
        {type: 'comparisonBlock'},
        {type: 'gallery2Block'},
        {type: 'gallery3Block'},
        {type: 'sliderBlock'},
        {type: 'videoBlock'},
        {type: 'timelineBlock'},
        {type: 'horizontalScrollBlock'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'coverImage',
    },
    prepare(selection) {
      const {title, category, media} = selection
      return {
        title,
        subtitle: category ? `Category: ${category}` : 'No category set',
        media,
      }
    },
  },
})
