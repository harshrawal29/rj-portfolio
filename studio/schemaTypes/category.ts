import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
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
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort categories. Lower numbers appear first.',
      validation: (rule) => rule.required(),
      initialValue: async (_, context) => {
        const client = context.getClient({apiVersion: '2024-01-01'})
        const count = await client.fetch(`count(*[_type == "category" && !(_id in path("drafts.**"))])`)
        return count + 1
      },
    }),
  ],
})
