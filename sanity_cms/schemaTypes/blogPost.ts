import { defineField, defineType } from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
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
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: '1–2 sentence preview shown on the blog listing card',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url' }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { value: 'javascript', title: 'JavaScript' },
                  { value: 'typescript', title: 'TypeScript' },
                  { value: 'python', title: 'Python' },
                  { value: 'bash', title: 'Bash' },
                  { value: 'go', title: 'Go' },
                  { value: 'rust', title: 'Rust' },
                  { value: 'json', title: 'JSON' },
                  { value: 'yaml', title: 'YAML' },
                  { value: 'html', title: 'HTML' },
                  { value: 'css', title: 'CSS' },
                  { value: 'other', title: 'Other' },
                ],
              },
            }),
            defineField({
              name: 'code',
              title: 'Code',
              type: 'text',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: { language: 'language', code: 'code' },
            prepare({ language, code }) {
              return {
                title: `Code: ${language ?? 'unknown'}`,
                subtitle: code?.slice(0, 80),
              }
            },
          },
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  { value: 'insight', title: '💡 Insight' },
                  { value: 'warning', title: '⚠️ Warning' },
                  { value: 'tip', title: '✅ Tip' },
                  { value: 'info', title: 'ℹ️ Info' },
                ],
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: { variant: 'variant', content: 'content' },
            prepare({ variant, content }) {
              const emojis: Record<string, string> = {
                insight: '💡',
                warning: '⚠️',
                tip: '✅',
                info: 'ℹ️',
              }
              return {
                title: `${emojis[variant] ?? ''} Callout: ${variant ?? 'unknown'}`,
                subtitle: content?.slice(0, 80),
              }
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
