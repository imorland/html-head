# HTML Head Items

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/ianm/html-head.svg)](https://packagist.org/packages/ianm/html-head)

A [Flarum](http://flarum.org) extension that gives forum administrators full control over custom tags injected into the HTML of their forum — without touching code or config files.

## Features

- **Structured tag types** — dedicated forms for `<meta>`, `<link>`, `<script>`, `<style>`, and raw HTML, with type-aware fields and validation for each
- **Inject into head or body** — choose per item whether it is injected into `<head>` or before `</body>`
- **Target forum, admin, or both** — each item can be scoped to the forum frontend, the admin panel, or both
- **Automatic preconnect hints** — `<link rel="preconnect">` and `<link rel="dns-prefetch">` hints are automatically generated for any cross-origin `<link>` or `<script>` tags, warming the connection before the browser needs it
- **Save-time rendering** — HTML is rendered and cached when you save, not on every page request; no database queries on the hot path
- **Live preview** — the modal shows a real-time preview of the exact HTML tag that will be injected as you fill in the fields
- **Sort order** — drag items into the order you need them injected
- **Clean admin UI** — searchable table with colour-coded type, location and page badges; icon buttons for edit and delete

## Tag types

| Type | What it does |
|------|-------------|
| **Meta** | Standard `name`/`content` or Open Graph `property`/`content` meta tags |
| **Link** | `<link>` tags with guided fields for `rel`, `href`, `as`, `fetchpriority`, `crossorigin`, and any additional attributes (e.g. `sizes`, `hreflang`, `media`) |
| **Script** | External `<script src>` with `defer`/`async`/`module`/`crossorigin` options, or inline `<script>` blocks |
| **Style** | Inline `<style>` blocks |
| **Raw HTML** | Freeform HTML for anything that doesn't fit the above |

## Performance

Items are rendered to HTML at save time and stored in two cache keys (one per injection location). On page load, `AddHeaders` reads from cache only — no database queries, no per-request rendering. When an item is created, updated, or deleted, only the affected cache keys are invalidated and synchronously rebuilt.

Cross-origin `<link>` and `<script>` tags automatically get preconnect and dns-prefetch hints prepended, reducing connection setup latency for external resources.

## Installation

```sh
composer require ianm/html-head:"*"
php flarum migrate
php flarum assets:publish
```

## Updating

```sh
composer update ianm/html-head
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/ianm/html-head)
- [GitHub](https://github.com/imorland/html-head)
- [Discuss](https://discuss.flarum.org/d/25907)

## Support

Please consider supporting my extension development and maintenance work.

<a href="https://www.buymeacoffee.com/ianm1" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
