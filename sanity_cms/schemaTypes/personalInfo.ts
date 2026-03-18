import {defineField, defineType} from 'sanity'

export const personalInfoType = defineType({
  name: 'personalInfo',
  title: 'Personal Info',
  type: 'document',
  fields: [
    // ── PERSONAL INFO ──────────────────────────────────
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'bio', title: 'Bio', type: 'text'}),
    defineField({name: 'expectedGraduation', title: 'Expected Graduation', type: 'string'}),

    // ── SOCIAL LINKS (flexible array) ──────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Key (e.g. linkedin)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'url', title: 'URL', type: 'url'}),
            defineField({name: 'displayUrl', title: 'Display URL', type: 'string'}),
            defineField({name: 'icon', title: 'Lucide Icon Name', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'color', title: 'Tailwind Color Class', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),

    // ── EXTERNAL LINKS ─────────────────────────────────
    defineField({name: 'calendlyUrl', title: 'Calendly URL', type: 'url'}),
    defineField({name: 'resume', title: 'Resume (PDF)', type: 'file', options: {accept: '.pdf'}}),

    // ── PERSONAL STORY ─────────────────────────────────
    defineField({name: 'introduction', title: 'Introduction', type: 'text'}),
    defineField({
      name: 'journey',
      title: 'Journey Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({name: 'vision', title: 'Vision', type: 'text'}),

    // ── SKILLS ─────────────────────────────────────────
    defineField({
      name: 'skills',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'icon', title: 'Lucide Icon Name', type: 'string'}),
            defineField({name: 'items', title: 'Skills', type: 'array', of: [{type: 'string'}]}),
            defineField({name: 'color', title: 'Tailwind Color Class', type: 'string'}),
          ],
          preview: {select: {title: 'category', subtitle: 'icon'}},
        },
      ],
    }),

    // ── CERTIFICATIONS ─────────────────────────────────
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'issuer', title: 'Issuer', type: 'string'}),
            defineField({name: 'year', title: 'Year', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'issuer'}},
        },
      ],
    }),
  ],
})
