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

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $db = $schema->getConnection();
        $rows = $db->table('html_headers')->whereNull('type')->get();

        foreach ($rows as $row) {
            $decoded = base64_decode($row->header, true);

            if ($decoded === false) {
                // Corrupted base64 — treat as raw, keep header column as-is
                $db->table('html_headers')->where('id', $row->id)->update([
                    'type'       => 'raw',
                    'location'   => 'head',
                    'pages'      => json_encode(['forum']),
                    'sort_order' => $row->id,
                    'attributes' => null,
                ]);
                continue;
            }

            $parsed = parseHeaderString(trim($decoded));

            $db->table('html_headers')->where('id', $row->id)->update([
                'type'       => $parsed['type'],
                'location'   => 'head',
                'pages'      => json_encode(['forum']),
                'sort_order' => $row->id,
                'attributes' => $parsed['attributes'] !== null ? json_encode($parsed['attributes']) : null,
            ]);
        }
    },

    'down' => function (Builder $schema) {
        // Reset migrated rows back to null type so the up() migration can re-run
        $schema->getConnection()->table('html_headers')
            ->whereNotNull('type')
            ->update([
                'type'       => null,
                'location'   => 'head',
                'pages'      => null,
                'sort_order' => 0,
                'attributes' => null,
            ]);
    },
];

/**
 * Parse a raw HTML tag string into a type + attributes array.
 * Returns ['type' => 'raw', 'attributes' => null] on parse failure.
 */
function parseHeaderString(string $html): array
{
    $fallback = ['type' => 'raw', 'attributes' => null];

    if (empty($html)) {
        return $fallback;
    }

    // Suppress DOMDocument warnings; use flags to avoid implicit html/body wrapping
    $doc = new DOMDocument();
    $loaded = @$doc->loadHTML(
        '<?xml encoding="utf-8"?>'.$html,
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR | LIBXML_NOWARNING
    );

    if (!$loaded) {
        return $fallback;
    }

    // Find first element node
    $element = null;
    foreach ($doc->childNodes as $node) {
        if ($node instanceof DOMElement) {
            $element = $node;
            break;
        }
    }

    if ($element === null) {
        return $fallback;
    }

    // If there are sibling elements, we can't cleanly split — fall back to raw
    $elementCount = 0;
    foreach ($doc->childNodes as $node) {
        if ($node instanceof DOMElement) {
            $elementCount++;
        }
    }

    if ($elementCount > 1) {
        return $fallback;
    }

    $tag = strtolower($element->tagName);
    $attrs = [];

    /** @var DOMAttr $attr */
    foreach ($element->attributes as $attr) {
        $attrs[$attr->name] = $attr->value;
    }

    switch ($tag) {
        case 'meta':
            if (isset($attrs['name']) && isset($attrs['content'])) {
                return ['type' => 'meta', 'attributes' => ['name' => $attrs['name'], 'content' => $attrs['content']]];
            }
            if (isset($attrs['property']) && isset($attrs['content'])) {
                return ['type' => 'meta', 'attributes' => ['property' => $attrs['property'], 'content' => $attrs['content']]];
            }
            // Some other meta variant — store all attrs and treat as meta
            return ['type' => 'meta', 'attributes' => $attrs];

        case 'link':
            if (!isset($attrs['rel'])) {
                return $fallback;
            }
            return ['type' => 'link', 'attributes' => $attrs];

        case 'script':
            if (isset($attrs['src'])) {
                unset($attrs['src']); // re-add cleanly
                $structured = array_merge(['src' => $attrs['src'] ?? ''], $attrs);
                // Normalise boolean attributes
                $result = ['src' => ''];
                foreach ($attrs as $k => $v) {
                    $result[$k] = $v;
                }
                // Extract src back from original attrs
                foreach ($element->attributes as $attr) {
                    if ($attr->name === 'src') {
                        $result['src'] = $attr->value;
                    }
                }
                $result['defer'] = $element->hasAttribute('defer');
                $result['async'] = $element->hasAttribute('async');
                $result['module'] = isset($attrs['type']) && $attrs['type'] === 'module';
                unset($result['type']);
                return ['type' => 'script', 'attributes' => $result];
            }
            // Inline script — extract text content
            $inline = $element->textContent;
            return ['type' => 'script', 'attributes' => ['inline' => $inline, 'module' => false]];

        case 'style':
            return ['type' => 'style', 'attributes' => ['inline' => $element->textContent]];

        default:
            return $fallback;
    }
}
