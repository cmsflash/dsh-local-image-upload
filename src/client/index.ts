/**
 * Local image upload plugin, browser half: the paperclip entry in the
 * composer's `conversation.input.attach` seat.
 * @module @dsh-external/dsh-local-image-upload/client
 */

import { AttachButton } from './AttachButton.tsx'
import { en, zh } from './locales.ts'

/** Dictionary namespace owned by this plugin. */
const NS = 'attach'

/** Required services: the slot registry and the copy. */
export const inject = ['slots', 'locale']

/**
 * Client plugin body: register the paperclip over the attach seat.
 * @param ctx - client root context.
 */
export function apply(ctx: any): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'local-image-upload: dictionaries')

  ctx.slots.inject('conversation.input.attach', () => ctx.slots.register({
    name: 'conversation.input.attach',
    locale: NS,
  }, AttachButton))
}
