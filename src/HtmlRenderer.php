<?php

/*
 * This file is part of ianm/htmlhead.
 *
 * Copyright (c) IanM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 *
 */

namespace IanM\HtmlHead;

/**
 * Renders a Header model into its final HTML string.
 *
 * Called at save time (via CacheRebuilder), never on the hot request path.
 */
class HtmlRenderer
{
    public function render(Header $header): string
    {
        // Use getRawOriginal to avoid Eloquent's internal $attributes property collision
        $rawJson = $header->getRawOriginal('attributes');
        $attrs = $rawJson ? (json_decode($rawJson, true) ?? []) : [];

        return match ($header->type) {
            'meta'   => $this->renderMeta($attrs),
            'link'   => $this->renderLink($attrs),
            'script' => $this->renderScript($attrs),
            'style'  => $this->renderStyle($attrs),
            'raw'    => $this->renderRaw($header),
            default  => '',
        };
    }

    private function renderMeta(array $attrs): string
    {
        if (empty($attrs)) {
            return '';
        }

        $tag = '<meta';

        // name or property comes first, then content, then any extras
        foreach (['name', 'property', 'content', 'charset', 'http-equiv'] as $key) {
            if (isset($attrs[$key])) {
                $tag .= ' '.$key.'="'.e($attrs[$key]).'"';
            }
        }

        // Any remaining attributes not already handled
        $handled = ['name', 'property', 'content', 'charset', 'http-equiv'];
        foreach ($attrs as $key => $value) {
            if (!in_array($key, $handled, true)) {
                $tag .= ' '.e($key).'="'.e($value).'"';
            }
        }

        return $tag.'>';
    }

    private function renderLink(array $attrs): string
    {
        if (empty($attrs) || !isset($attrs['rel'])) {
            return '';
        }

        $tag = '<link';

        // rel and href first for readability
        foreach (['rel', 'href'] as $key) {
            if (isset($attrs[$key])) {
                $tag .= ' '.$key.'="'.e($attrs[$key]).'"';
            }
        }

        // Boolean attributes
        $booleans = ['crossorigin'];

        $handled = ['rel', 'href'];
        foreach ($attrs as $key => $value) {
            if (in_array($key, $handled, true)) {
                continue;
            }
            if (in_array($key, $booleans, true)) {
                if ($value === true || $value === '' || $value === 'anonymous') {
                    $tag .= ' '.$key.($value !== true ? '="'.e((string) $value).'"' : '');
                }
            } else {
                $tag .= ' '.e($key).'="'.e($value).'"';
            }
        }

        return $tag.'>';
    }

    private function renderScript(array $attrs): string
    {
        if (empty($attrs)) {
            return '';
        }

        // Inline script
        if (isset($attrs['inline'])) {
            $type = !empty($attrs['module']) ? ' type="module"' : '';

            // Inline JS is admin-only content — trusted, not escaped
            return '<script'.$type.'>'.$attrs['inline'].'</script>';
        }

        // External script
        if (empty($attrs['src'])) {
            return '';
        }

        $tag = '<script src="'.e($attrs['src']).'"';

        if (!empty($attrs['defer'])) {
            $tag .= ' defer';
        }
        if (!empty($attrs['async'])) {
            $tag .= ' async';
        }
        if (!empty($attrs['module'])) {
            $tag .= ' type="module"';
        }
        if (!empty($attrs['crossorigin'])) {
            $crossorigin = $attrs['crossorigin'] === true ? 'anonymous' : e($attrs['crossorigin']);
            $tag .= ' crossorigin="'.$crossorigin.'"';
        }

        return $tag.'></script>';
    }

    private function renderStyle(array $attrs): string
    {
        if (empty($attrs['inline'])) {
            return '';
        }

        // Inline CSS is admin-only content — trusted, not escaped
        return '<style>'.$attrs['inline'].'</style>';
    }

    private function renderRaw(Header $header): string
    {
        // New-style raw rows store content in structured attributes
        // Use getRawOriginal to avoid Eloquent's internal $attributes property collision
        $raw = $header->getRawOriginal('attributes');
        if (!empty($raw)) {
            $decoded = json_decode($raw, true);
            if (isset($decoded['content'])) {
                return $decoded['content'];
            }
        }

        if ($header->header === null) {
            return '';
        }

        // Legacy rows may be base64-encoded (stored via the old API) or plain HTML
        // (inserted directly). Attempt base64 decode; if the result looks like HTML
        // use it, otherwise treat the stored value as already-plain HTML.
        $decoded = base64_decode($header->header, true);

        if ($decoded !== false && str_starts_with(ltrim($decoded), '<')) {
            return $decoded;
        }

        return $header->header;
    }
}
