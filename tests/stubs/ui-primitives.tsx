// Host-supplied module stub for the component test lane: the real bundle keeps
// the import external and receives the shell-seeded copy at runtime.

import type { ReactElement } from 'react'

/** Sizing and class props common to every primitive icon. */
export interface IconProps {
  size?: number
  className?: string
}

/** Paperclip glyph stand-in: one element, content-free. */
export function IconPaperclipOutline16(_props?: IconProps): ReactElement {
  return <i data-testid="icon-paperclip" />
}

/** Tooltip stand-in: render the anchor untouched. */
export function Tooltip({ children }: {
  label: unknown
  side?: unknown
  delayMs?: unknown
  disabled?: unknown
  maxWidth?: unknown
  children: ReactElement
}): ReactElement {
  return children
}
