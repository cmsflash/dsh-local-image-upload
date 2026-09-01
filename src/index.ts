/**
 * `@dsh-external/dsh-local-image-upload`: click-to-browse image upload for
 * the Web composer.
 *
 * Browser-only: the bundle mounts no Host service. The composer's
 * `conversation.input.attach` seat hands over the same intake that backs
 * paste and drag-and-drop, so picked files ride the existing validation,
 * rejection notices, and draft-image rail. No new session event, wire field,
 * or attachment format is introduced.
 * @module @dsh-external/dsh-local-image-upload
 */

/** Cordis plugin name used by loader diagnostics. */
export const name = 'local-image-upload'

/** The Host half needs no services. */
export const inject: readonly string[] = []

/**
 * Host apply: nothing to mount. Declared for the plugin protocol; the
 * browser half in `./client` owns the whole feature.
 * @param _ctx - unused: no Host-side surface.
 */
export function apply(_ctx: unknown): void {}
