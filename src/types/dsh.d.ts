/** Minimal compile-time declarations for DSH packages supplied by the Host at runtime. */

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

declare module '@deepseek-ai/cordis' {
  export interface Context {
    readonly slots: any
    readonly locale: any
    readonly logger: { warn(message: string): void }
    /**
     * Registers a teardown-bound effect. The factory returns a disposer, a
     * generator yielding disposers, or nothing; the returned disposer settles
     * once teardown completes.
     */
    effect(factory: () => unknown, label?: string): () => Promise<void>
    on(name: string, listener: (...args: any[]) => any): () => void
    get(name: string): unknown
    plugin(plugin: any, config?: any): any
    inject(names: readonly string[], callback: (ctx: Context) => void): void
  }

  /** The Host supplies `Context` as a class, so it is importable as a value. */
  export class Context {}
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  /** Minimal observable API for host-provided standard-kit data sources. */
  export interface HostObservable<T> {
    getSnapshot(): T
    subscribe(fn: () => void): () => void
  }

  /**
   * Declared locale namespaces, keyed by namespace name to that namespace's
   * dictionary key union. Each owning package merges its own seat.
   */
  export interface LocaleNamespaceMap {}

  /**
   * Declared slots, keyed by slot name; `owner` is the props share the render
   * site passes. Each declaring package merges its own entry.
   */
  export interface SlotMap {
    /**
     * The named attach seat in the composer tool row. Declared and typed by
     * ui-conversation; the render site passes the composer's own image intake.
     */
    'conversation.input.attach': { owner: {
      locked: boolean
      canAddImages: boolean
      onAddImages: (files: readonly File[]) => void
      acceptedMediaTypes?: readonly string[] | undefined
    } }
  }

  /** Owner props of one declared slot. */
  type OwnerOf<K extends keyof SlotMap> = SlotMap[K] extends { owner: infer O } ? O : object

  /** Runtime props share for a slot key: the owner share plus the session kit. */
  export type PropsRuntime<K extends keyof SlotMap & string> = OwnerOf<K> & { sessionId: string }

  /** Locale share: the framework-injected `t` seat of a declared namespace. */
  export type PropsLocale<N> = N extends keyof LocaleNamespaceMap & string
    ? { t: (key: LocaleNamespaceMap[N] & string, params?: Record<string, unknown>) => string }
    : object
}

declare module '@deepseek-ai/dsh-client-ui-primitives' {
  import type { ReactElement } from 'react'

  /** Sizing and class props common to every primitive icon. */
  export interface IconProps {
    size?: number
    className?: string
  }

  /** Paperclip glyph, 16px. */
  export function IconPaperclipOutline16(props?: IconProps): ReactElement

  /** Where the bubble sits relative to its anchor. */
  export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

  /**
   * Hover/focus label attached to a single anchor element.
   * @param props - the label, the requested side, and the anchor element.
   * @returns the cloned anchor plus its bubble while hovered or focused.
   */
  export function Tooltip(props: {
    label: ReactNode | (() => ReactNode)
    side?: TooltipSide
    delayMs?: number
    disabled?: boolean
    maxWidth?: number
    children: ReactElement
  }): ReactElement
}

declare module '@deepseek-ai/dsh-client-ui-conversation/client' {
  /** Owner props of the composer's named attach seat. */
  export interface ComposerAttachOwnerProps {
    locked: boolean
    canAddImages: boolean
    onAddImages: (files: readonly File[]) => void
    acceptedMediaTypes?: readonly string[] | undefined
  }
}
