import React, {useEffect, useState} from 'react'
import {StringInputProps, useFormValue, useClient} from 'sanity'

interface BacklinkItem {
  title: string
  links: {relationship: string}[]
}

export function BacklinksInput(_props: StringInputProps) {
  const rawId = useFormValue(['_id']) as string | undefined
  const client = useClient({apiVersion: '2024-01-01'})
  const [backlinks, setBacklinks] = useState<BacklinkItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!rawId) return
    // Strip draft prefix so references() resolves against the published document ID
    const id = rawId.replace(/^drafts\./, '')

    client
      .fetch<BacklinkItem[]>(
        `*[_type == "project" && references($id)] {
          title,
          "links": projectLinks[target._ref == $id] { relationship }
        }`,
        {id},
      )
      .then((data) => {
        setBacklinks(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('BacklinksInput query failed:', err)
        setLoading(false)
      })
  }, [client, rawId])

  if (loading) {
    return (
      <div style={{color: 'var(--gray-500, #888)', padding: '8px', fontSize: '14px'}}>
        Loading backlinks…
      </div>
    )
  }

  const items = backlinks.flatMap((project) =>
    project.links.map((link) => ({title: project.title, relationship: link.relationship})),
  )

  if (items.length === 0) {
    return (
      <div
        style={{
          color: 'var(--gray-500, #888)',
          padding: '8px',
          fontSize: '14px',
          fontStyle: 'italic',
        }}
      >
        No projects link to this one yet.
      </div>
    )
  }

  return (
    <ul style={{margin: 0, padding: '4px 0', listStyle: 'none'}}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            padding: '4px 8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            fontSize: '14px',
          }}
        >
          <span style={{fontWeight: 600}}>{item.title}</span>
          <span style={{color: 'var(--gray-500, #888)'}}>→</span>
          <span style={{color: 'var(--blue-500, #3b82f6)', fontFamily: 'monospace'}}>
            {item.relationship}
          </span>
        </li>
      ))}
    </ul>
  )
}
