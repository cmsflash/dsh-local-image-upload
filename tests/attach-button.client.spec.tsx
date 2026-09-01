// @vitest-environment jsdom
// AttachButton behavior: the hidden input's filter and multiplicity, the
// disabled state, focus preservation on press, and handoff to onAddImages.

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AttachButton } from '../src/client/AttachButton.tsx'
import type { AttachButtonProps } from '../src/client/AttachButton.tsx'
import type { AttachKey } from '../src/client/locales.ts'

afterEach(cleanup)

const t = (key: AttachKey): string => {
  const zh: Record<AttachKey, string> = {
    'button.aria': '上传图片',
    'button.tooltip': '上传图片',
  }
  return zh[key]
}

function props(over: Partial<AttachButtonProps> = {}): AttachButtonProps {
  return {
    locked: false,
    canAddImages: true,
    onAddImages: vi.fn(),
    acceptedMediaTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
    t,
    ...over,
  }
}

describe('AttachButton', () => {
  it('renders the hidden multi-select input filtered to the accepted media types', () => {
    const view = render(<AttachButton {...props()} />)
    const input = view.container.querySelector<HTMLInputElement>('input[type="file"]')
    expect(input).not.toBeNull()
    expect(input?.multiple).toBe(true)
    expect(input?.getAttribute('accept')).toBe('image/png,image/jpeg,image/webp,image/gif')
    expect(screen.getByLabelText('上传图片')).toBeTruthy()
  })

  it('disables while locked or while intake is unavailable', () => {
    const view = render(<AttachButton {...props({ locked: true })} />)
    expect((view.getByLabelText('上传图片') as HTMLButtonElement).disabled).toBe(true)
    cleanup()
    const unavailable = render(<AttachButton {...props({ canAddImages: false })} />)
    expect((unavailable.getByLabelText('上传图片') as HTMLButtonElement).disabled).toBe(true)
  })

  it('hands picked files to the composer intake and resets for a repeat pick', () => {
    const onAddImages = vi.fn()
    const view = render(<AttachButton {...props({ onAddImages })} />)
    const input = view.container.querySelector<HTMLInputElement>('input[type="file"]')!
    const first = new File([Uint8Array.of(1)], 'a.png', { type: 'image/png' })
    const second = new File([Uint8Array.of(2)], 'b.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [first, second] } })
    expect(onAddImages).toHaveBeenCalledTimes(1)
    expect(onAddImages.mock.calls[0]?.[0]).toEqual([first, second])
    // Same-name repeat pick still fires change: value was reset.
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { files: [first] } })
    expect(onAddImages).toHaveBeenCalledTimes(2)
  })

  it('omits the accept filter when the deployment publishes none', () => {
    const view = render(<AttachButton {...props({ acceptedMediaTypes: undefined })} />)
    const input = view.container.querySelector<HTMLInputElement>('input[type="file"]')
    expect(input?.hasAttribute('accept')).toBe(false)
  })

  it('suppresses the mousedown focus steal so typing continues after a cancelled pick', () => {
    const view = render(<AttachButton {...props()} />)
    const button = view.getByLabelText('上传图片')
    const prevented = fireEvent.mouseDown(button)
    expect(prevented).toBe(false)
  })
})
