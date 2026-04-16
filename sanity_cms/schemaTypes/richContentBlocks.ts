import { defineArrayMember, defineField } from 'sanity'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArrayOf = any[]

/**
 * Shared rich-content block definition used by both Blog Post body and
 * Project Detailed Description. Edit this file to change the editor
 * capabilities for both fields simultaneously.
 */
export const richContentBlocks = [
  defineArrayMember({
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
        defineArrayMember({
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            defineField({ name: 'href', title: 'URL', type: 'url' }),
          ],
        }),
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      defineField({
        name: 'gifUrl',
        title: 'GIF URL (external)',
        type: 'url',
        description: 'Paste an external GIF link here. Overrides the uploaded image above.',
      }),
    ],
  }),
  defineArrayMember({
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
      select: { language: 'language', code: 'code' } as Record<string, string>,
      prepare(selection: Record<string, string>) {
        const { language, code } = selection
        return {
          title: `Code: ${language ?? 'unknown'}`,
          subtitle: code?.slice(0, 80),
        }
      },
    },
  }),
  defineArrayMember({
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
      select: { variant: 'variant', content: 'content' } as Record<string, string>,
      prepare({ variant, content }: { variant: string; content: string }) {
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
  }),
  defineArrayMember({
    type: 'object',
    name: 'audioClip',
    title: 'Audio Clip',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'caption',
        title: 'Caption',
        type: 'string',
      }),
      defineField({
        name: 'audioFile',
        title: 'Audio File',
        type: 'file',
        options: { accept: 'audio/*' },
        description: 'Upload an audio file (.mp3, .wav, .ogg, etc.).',
      }),
      defineField({
        name: 'audioUrl',
        title: 'External Audio URL',
        type: 'url',
        description: 'Direct link to a hosted audio file. Overrides the uploaded file above.',
      }),
    ],
    preview: {
      select: { title: 'title', caption: 'caption' } as Record<string, string>,
      prepare({ title, caption }: { title: string; caption: string }) {
        return {
          title: `🎵 Audio: ${title ?? 'untitled'}`,
          subtitle: caption,
        }
      },
    },
  }),
] as AnyArrayOf
