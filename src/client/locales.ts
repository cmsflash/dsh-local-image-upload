/** `attach` namespace dictionaries (the composer paperclip's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'button.aria': '上传图片',
  'button.tooltip': '上传图片',
} satisfies Record<string, string>

/** The attach namespace key union. */
export type AttachKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The composer paperclip's copy. */
    attach: AttachKey
  }
}

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'button.aria': 'Upload image',
  'button.tooltip': 'Upload image',
} satisfies Record<AttachKey, string>
