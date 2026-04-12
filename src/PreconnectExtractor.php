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

use Flarum\Foundation\Config;

/**
 * Extracts the cross-origin base URL from a Header model for preconnect hint generation.
 *
 * Called at save time (via CacheRebuilder), never on the hot request path.
 */
class PreconnectExtractor
{
    /**
     * Rel values that warrant a preconnect hint for cross-origin hrefs.
     */
    private const PRECONNECT_RELS = ['preload', 'stylesheet', 'modulepreload'];

    public function __construct(private readonly Config $config)
    {
    }

    /**
     * Returns cross-origin origins to preconnect to (may be empty).
     *
     * @return string[]
     */
    public function extract(Header $header): array
    {
        $forumOrigin = $this->forumOrigin();

        $rawJson = $header->getRawOriginal('attributes');
        $attrs = $rawJson ? (json_decode($rawJson, true) ?? []) : [];

        return match ($header->type) {
            'link'   => array_filter([$this->fromLink($attrs, $forumOrigin)]),
            'script' => array_filter([$this->fromScript($attrs, $forumOrigin)]),
            'raw'    => $this->fromRaw($header, $forumOrigin),
            default  => [],
        };
    }

    private function forumOrigin(): string
    {
        $url = $this->config->url();
        return $url->getScheme().'://'.$url->getHost();
    }

    private function fromLink(array $attrs, string $forumOrigin): ?string
    {
        $rel  = $attrs['rel'] ?? '';
        $href = $attrs['href'] ?? '';

        // rel=preconnect IS the preconnect — don't double-emit
        // rel=dns-prefetch similarly
        if (!in_array($rel, self::PRECONNECT_RELS, true) || empty($href)) {
            return null;
        }

        return $this->crossOrigin($href, $forumOrigin);
    }

    private function fromScript(array $attrs, string $forumOrigin): ?string
    {
        $src = $attrs['src'] ?? null;

        // Inline scripts have no remote origin
        if (empty($src)) {
            return null;
        }

        return $this->crossOrigin($src, $forumOrigin);
    }

    /**
     * Parse raw HTML and extract all cross-origin origins from link/script tags.
     *
     * @return string[]
     */
    private function fromRaw(Header $header, string $forumOrigin): array
    {
        // Get the rendered HTML string — use the same logic as HtmlRenderer::renderRaw()
        $rawJson = $header->getRawOriginal('attributes');
        if (!empty($rawJson)) {
            $decoded = json_decode($rawJson, true);
            $html = $decoded['content'] ?? '';
        } else {
            $html = $header->header ?? '';
            $b64 = base64_decode($html, true);
            if ($b64 !== false && str_starts_with(ltrim($b64), '<')) {
                $html = $b64;
            }
        }

        if (empty($html)) {
            return [];
        }

        $doc = new \DOMDocument();
        @$doc->loadHTML(
            '<?xml encoding="utf-8"?>'.$html,
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR | LIBXML_NOWARNING
        );

        $origins = [];

        foreach ($doc->getElementsByTagName('link') as $el) {
            if (!$el instanceof \DOMElement) {
                continue;
            }
            $rel = $el->getAttribute('rel');
            if (!in_array($rel, self::PRECONNECT_RELS, true)) {
                continue;
            }
            $href = $el->getAttribute('href');
            if ($href && ($origin = $this->crossOrigin($href, $forumOrigin)) !== null) {
                $origins[] = $origin;
            }
        }

        foreach ($doc->getElementsByTagName('script') as $el) {
            if (!$el instanceof \DOMElement) {
                continue;
            }
            $src = $el->getAttribute('src');
            if ($src && ($origin = $this->crossOrigin($src, $forumOrigin)) !== null) {
                $origins[] = $origin;
            }
        }

        return array_values(array_unique($origins));
    }

    private function crossOrigin(string $url, string $forumOrigin): ?string
    {
        $parts = parse_url($url);

        if (empty($parts['host'])) {
            return null; // relative URL = same-origin
        }

        $scheme = $parts['scheme'] ?? 'https';
        $origin = $scheme.'://'.$parts['host'];

        return $origin !== $forumOrigin ? $origin : null;
    }
}
