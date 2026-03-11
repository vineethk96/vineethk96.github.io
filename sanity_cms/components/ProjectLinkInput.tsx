import React, {useEffect, useState} from 'react'
import {ObjectInputProps, set, useFormValue, useClient} from 'sanity'

const RELATIONSHIP_TYPES = [
  'research-application',
  'iot-platform',
  'embedded-evolution',
  'sensor-system',
  'mobile-app',
  'rest-api',
  'cloud-architecture',
  'systems-thinking',
]

interface ProjectOption {
  _id: string
  title: string
}

const selectStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid var(--input-border-color, #ccc)',
  background: 'var(--input-bg-color, #fff)',
  color: 'var(--input-fg-color, #111)',
  width: '100%',
  fontSize: '14px',
}

export function ProjectLinkInput(props: ObjectInputProps) {
  const {value, onChange} = props
  const sourceTitle = useFormValue(['title']) as string | undefined
  const client = useClient({apiVersion: '2024-01-01'})
  const [projects, setProjects] = useState<ProjectOption[]>([])

  useEffect(() => {
    client
      .fetch<ProjectOption[]>(`*[_type == "project"] | order(title asc) { _id, title }`)
      .then(setProjects)
      .catch(console.error)
  }, [client])

  const currentRelationship = (value as Record<string, unknown> | undefined)?.relationship as string ?? ''
  const currentTargetRef = (
    (value as Record<string, unknown> | undefined)?.target as Record<string, unknown> | undefined
  )?._ref as string ?? ''

  const handleRelationshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(set(e.target.value, ['relationship']))
  }

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return
    onChange(set({_type: 'reference', _ref: e.target.value}, ['target']))
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        alignItems: 'center',
        padding: '8px 0',
      }}
    >
      <div
        style={{
          padding: '8px',
          borderRadius: '4px',
          background: 'var(--card-bg-color, #f5f5f5)',
          color: 'var(--gray-600, #555)',
          fontSize: '14px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={sourceTitle ?? '(untitled)'}
      >
        <strong>Source:</strong> {sourceTitle ?? '(untitled)'}
      </div>

      <select
        aria-label="Relationship type"
        value={currentRelationship}
        onChange={handleRelationshipChange}
        style={selectStyle}
      >
        <option value="">Select relationship…</option>
        {RELATIONSHIP_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        aria-label="Target project"
        value={currentTargetRef}
        onChange={handleTargetChange}
        style={selectStyle}
      >
        <option value="">Select target project…</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title}
          </option>
        ))}
      </select>
    </div>
  )
}
