import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
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
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Short Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icon (lucide-react name)', type: 'string' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'color', title: 'Color (Tailwind gradient class)', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['In-Progress', 'Completed'] },
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
    defineField({ name: 'github', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'demo', title: 'Demo URL', type: 'url' }),
    defineField({ name: 'mapColor', title: 'Map Color (hex)', type: 'string' }),
    defineField({
      name: 'size',
      title: 'Map Node Size (D3)',
      type: 'number',
      validation: Rule => Rule.integer(),
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectImage',
          title: 'Image',
          fields: [
            defineField({ name: 'url', title: 'Large URL', type: 'url' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'original_url', title: 'Original URL', type: 'url' }),
            defineField({ name: 'medium_url', title: 'Medium URL', type: 'url' }),
            defineField({ name: 'thumbnail_url', title: 'Thumbnail URL', type: 'url' }),
          ],
          preview: { select: { title: 'alt', subtitle: 'caption' } },
        },
      ],
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
