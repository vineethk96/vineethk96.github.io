import { defineField, defineType } from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (ID)',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Institution',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Degree / Program',
      type: 'string',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      validation: Rule => Rule.required().integer(),
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'number',
      validation: Rule => Rule.integer(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['In Progress', 'Completed', 'Deferred'] },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (lucide-react name)',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Color (Tailwind class)',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  orderings: [
    {
      title: 'Start Year, Newest',
      name: 'startYearDesc',
      by: [{ field: 'startYear', direction: 'desc' }],
    },
  ],
})
