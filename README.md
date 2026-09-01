# dsh-local-image-upload

A click-to-browse image upload entry for the DeepSeek Harness Web composer.

## What it adds

A paperclip button in the composer tool row that opens the system file picker
(multi-select, filtered to the deployment's accepted image media types). Picked
files enter through the composer's shared image intake — the same validation
path, rejection notices, and draft-image rail that already back paste and
drag-and-drop. Nothing new reaches the session log, the wire, or the attachment
store: an image picked from disk is indistinguishable from a pasted one.

The button is disabled while the composer is locked or while no attachment
service is mounted, matching the drop target's availability.

## Requirements

The composer slot `conversation.input.attach`, shipped in
`@deepseek-ai/dsh-client-ui-conversation`. Before that seam exists, the plugin
waits on the slot declaration and renders nothing.

## Model Experience

No effect on the model. The plugin adds a DOM intake gesture only; the picked
image becomes the same draft attachment a paste produces, with the same
`ImageLimits` enforcement, the same request projection, and the same
model-visible image blocks. Token and KV-cache behavior are identical to paste.

## Install

Add the row to a profile `package.json`:

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "@dsh-external/dsh-local-image-upload"
      ]
    }
  }
}
```

then `pnpm install` in the profile directory. No configuration keys.

## Development

```sh
pnpm install
pnpm check   # typecheck + component tests + build
```

Browser-only bundle: `lib/client.js` registers the paperclip through the slot
system; `lib/index.js` is an empty Host half.
