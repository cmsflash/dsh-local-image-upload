/**
 * The composer's paperclip: a hidden multi-select file input plus the icon
 * button that opens it. Picked files go through `onAddImages`, the composer's
 * shared intake, so limits and rejection notices match paste and drop.
 * @module @dsh-external/dsh-local-image-upload/client/AttachButton
 */

import { useRef } from 'react'
import { IconPaperclipOutline16, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ComposerAttachOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from './locales.ts'
import css from './AttachButton.module.css'

/** Full props of the attach entry. */
export type AttachButtonProps = ComposerAttachOwnerProps & PropsLocale<'attach'>

/**
 * Render the paperclip button.
 * @param props - the composer's intake share plus the locale seat.
 */
export function AttachButton({ locked, canAddImages, onAddImages, acceptedMediaTypes, t }: AttachButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const open = (): void => {
    // Button presses steal focus from the textarea; suppress at mousedown so
    // typing continues seamlessly after a cancelled pick.
    inputRef.current?.click()
  }

  const keepFocus = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files ?? [])
    if (files.length > 0) onAddImages(files)
    // A repeated pick of the same file must still fire change: reset value.
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className={css.file}
        accept={acceptedMediaTypes?.join(',')}
        multiple
        aria-hidden="true"
        tabIndex={-1}
        onChange={onChange}
      />
      <Tooltip label={t('button.tooltip')} side="top" delayMs={500}>
        <button
          type="button"
          className={css.button}
          aria-label={t('button.aria')}
          disabled={locked || !canAddImages}
          onMouseDown={keepFocus}
          onClick={open}
        >
          <IconPaperclipOutline16 size={14} />
        </button>
      </Tooltip>
    </>
  )
}
