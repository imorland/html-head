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

use Illuminate\Contracts\Cache\Repository as Cache;

/**
 * Rebuilds the pre-rendered header cache from the database.
 *
 * One DB query, renders all items, writes two cache keys (head/foot).
 * Called after any create/update/delete — never on the hot request path.
 */
class CacheRebuilder
{
    public function __construct(
        private readonly Cache $cache,
        private readonly HtmlRenderer $renderer,
        private readonly PreconnectExtractor $extractor,
    ) {
    }

    public function rebuild(): void
    {
        $all = Header::where('active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $byLocation = ['head' => [], 'foot' => []];

        foreach ($all as $header) {
            $location = in_array($header->location, Header::VALID_LOCATIONS, true)
                ? $header->location
                : 'head';

            $rendered = $this->renderer->render($header);

            if ($rendered === '') {
                continue;
            }

            $byLocation[$location][] = [
                'html'               => $rendered,
                'preconnect_origins' => $this->extractor->extract($header),
                'pages'              => $header->pages ?? ['forum'],
                'meta'               => $location === 'head' ? $this->namedMeta($header) : null,
            ];
        }

        $this->cache->forever(Header::CACHE_KEY_HEAD, $byLocation['head']);
        $this->cache->forever(Header::CACHE_KEY_FOOT, $byLocation['foot']);
    }

    /**
     * A meta item that is just name + content, which fits Document::$meta.
     *
     * @return array{name: string, content: string}|null
     */
    private function namedMeta(Header $header): ?array
    {
        if ($header->type !== 'meta') {
            return null;
        }

        $rawJson = $header->getRawOriginal('attributes');
        $attrs = $rawJson ? (json_decode($rawJson, true) ?? []) : [];

        if (count($attrs) !== 2 || !is_string($attrs['name'] ?? null) || $attrs['name'] === '' || !is_string($attrs['content'] ?? null)) {
            return null;
        }

        return ['name' => $attrs['name'], 'content' => $attrs['content']];
    }

    public function invalidate(): void
    {
        $this->cache->forget(Header::CACHE_KEY_HEAD);
        $this->cache->forget(Header::CACHE_KEY_FOOT);
        $this->cache->forget(Header::CACHE_KEY);
    }
}
