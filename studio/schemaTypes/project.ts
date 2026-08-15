import {defineField, defineType} from 'sanity'
import React from 'react'

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
      name: 'cover',
      title: 'Cover Media',
      type: 'file',
      description: 'Upload an image, GIF, or MP4 video for the project cover.',
      options: {
        accept: 'image/*,video/mp4',
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
      name: 'clientHeading',
      title: 'Client Heading',
      type: 'string',
      description: 'Override the "Client" label in the metadata section',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Heading',
      type: 'string',
      description: 'Override the "Services" label in the metadata section',
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
      description: 'Used to sort projects. Lower numbers appear first.',
      validation: (rule) => rule.required(),
      initialValue: async (_, context) => {
        const client = context.getClient({apiVersion: '2024-01-01'})
        const count = await client.fetch(`count(*[_type == "project" && !(_id in path("drafts.**"))])`)
        return count + 1
      },
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
      mediaUrl: 'cover.asset.url',
    },
    prepare(selection) {
      const {title, category, mediaUrl} = selection
      let media
      
      if (mediaUrl) {
         if (mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            media = React.createElement('img', { 
               src: mediaUrl, 
               style: { objectFit: 'cover', width: '100%', height: '100%' } 
            })
         } else if (mediaUrl.match(/\.(mp4|webm)$/i)) {
            media = React.createElement('video', { 
               src: mediaUrl, 
               muted: true,
               style: { objectFit: 'cover', width: '100%', height: '100%' } 
            })
         }
      }
      
      return {
        title,
        subtitle: category ? `Category: ${category}` : 'No category set',
        media,
      }
    },
  },
})
