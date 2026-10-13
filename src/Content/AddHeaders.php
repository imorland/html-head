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

namespace IanM\HtmlHead\Content;

use Flarum\Frontend\Document;
use IanM\HtmlHead\CacheRebuilder;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Cache\Repository as Cache;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Injects the items applied to one frontend; see AddForumHeaders and AddAdminHeaders.
 */
abstract class AddHeaders
{
    abstract protected function frontend(): string;

    public function __construct(
        private readonly Cache $cache,
        private readonly CacheRebuilder $rebuilder,
    ) {
    }

    public function __invoke(Document $document, ServerRequestInterface $request): void
    {
        $frontend = $this->frontend();

        $this->inject($document, 'head', $frontend);
        $this->inject($document, 'foot', $frontend);
    }

    private function inject(Document $document, string $location, string $frontend): void
    {
        $cacheKey = $location === 'head' ? Header::CACHE_KEY_HEAD : Header::CACHE_KEY_FOOT;

        $items = $this->cache->get($cacheKey);

        if ($items === null) {
            // Cold cache miss — rebuild synchronously, then read back
            $this->rebuilder->rebuild();
            $items = $this->cache->get($cacheKey) ?? [];
        }

        foreach ($items as $item) {
            if (!in_array($frontend, $item['pages'] ?? ['forum'], true)) {
                continue;
            }

            // Replace a tag Flarum (or another extension) already outputs, such as description, rather than duplicate it
            $meta = $item['meta'] ?? null;
            if ($meta !== null && array_key_exists($meta['name'], $document->meta)) {
                $document->meta[$meta['name']] = $meta['content'];
                continue;
            }

            // Emit preconnect + dns-prefetch before the item for each cross-origin resource
            foreach ($item['preconnect_origins'] ?? [] as $origin) {
                $origin = e($origin);
                $document->{$location}[] = '<link rel="preconnect" href="'.$origin.'" crossorigin>';
                $document->{$location}[] = '<link rel="dns-prefetch" href="'.$origin.'">';
            }

            $document->{$location}[] = $item['html'];
        }
    }
}
