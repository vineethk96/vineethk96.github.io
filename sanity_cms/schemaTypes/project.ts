import { defineField, defineType, defineArrayMember } from 'sanity'
import { richContentBlocks } from './richContentBlocks'
import { ProjectLinkInput } from '../components/ProjectLinkInput'
import { BacklinksInput } from '../components/BacklinksInput'

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
      of: richContentBlocks,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'projectLinks',
      title: 'Project Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectLink',
          title: 'Link',
          fields: [
            defineField({
              name: 'target',
              title: 'Target Project',
              type: 'reference',
              to: [{ type: 'project' }],
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'relationship',
              title: 'Relationship',
              type: 'string',
              options: {
                list: [
                  { value: 'research-application', title: 'Research Application' },
                  { value: 'iot-platform', title: 'IoT Platform' },
                  { value: 'embedded-evolution', title: 'Embedded Evolution' },
                  { value: 'sensor-system', title: 'Sensor System' },
                  { value: 'mobile-app', title: 'Mobile App' },
                  { value: 'rest-api', title: 'REST API' },
                  { value: 'cloud-architecture', title: 'Cloud Architecture' },
                  { value: 'systems-thinking', title: 'Systems Thinking' },
                ],
              },
              validation: Rule => Rule.required(),
            }),
          ],
          components: {
            input: ProjectLinkInput,
          },
          preview: {
            select: {
              relationship: 'relationship',
              targetTitle: 'target.title',
            },
            prepare({ relationship, targetTitle }) {
              return {
                title: targetTitle ?? '(no target)',
                subtitle: relationship ?? '(no relationship)',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'cadModel',
      title: 'CAD Model (STL)',
      type: 'file',
      options: { accept: '.stl' },
    }),
    defineField({
      name: 'cadCameraView',
      title: 'CAD Default View',
      type: 'string',
      description: 'Initial camera angle for the 3D viewer. Defaults to Isometric – Top Front Right.',
      options: {
        list: [
          { title: 'Isometric – Top Front Right',    value: 'iso-top-front-right'    },
          { title: 'Isometric – Top Front Left',     value: 'iso-top-front-left'     },
          { title: 'Isometric – Top Back Right',     value: 'iso-top-back-right'     },
          { title: 'Isometric – Top Back Left',      value: 'iso-top-back-left'      },
          { title: 'Isometric – Bottom Front Right', value: 'iso-bottom-front-right' },
          { title: 'Isometric – Bottom Front Left',  value: 'iso-bottom-front-left'  },
          { title: 'Isometric – Bottom Back Right',  value: 'iso-bottom-back-right'  },
          { title: 'Isometric – Bottom Back Left',   value: 'iso-bottom-back-left'   },
          { title: 'Front',  value: 'front'  },
          { title: 'Back',   value: 'back'   },
          { title: 'Right',  value: 'right'  },
          { title: 'Left',   value: 'left'   },
          { title: 'Top',    value: 'top'    },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
    }),
    defineField({
      name: 'cadModelRotation',
      title: 'CAD Model Rotation',
      type: 'object',
      description: 'Rotate the model around its own axes for the default view.',
      fields: [
        defineField({
          name: 'x',
          title: 'X Rotation (°)',
          type: 'number',
          description: 'Rotate model around its own X axis (-180 to 180)',
        }),
        defineField({
          name: 'y',
          title: 'Y Rotation (°)',
          type: 'number',
          description: 'Rotate model around its own Y axis (-180 to 180)',
        }),
        defineField({
          name: 'z',
          title: 'Z Rotation (°)',
          type: 'number',
          description: 'Rotate model around its own Z axis (-180 to 180)',
        }),
      ],
    }),
    defineField({
      name: 'linkedBy',
      title: 'Linked By',
      type: 'string',
      readOnly: true,
      components: {
        input: BacklinksInput,
      },
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
