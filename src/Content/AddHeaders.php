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

class AddHeaders
{
    public function __construct(
        private readonly Cache $cache,
        private readonly CacheRebuilder $rebuilder,
    ) {
    }

    public function __invoke(Document $document, ServerRequestInterface $request): void
    {
        $frontend = $this->resolveFrontend($request);

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

            // Emit preconnect + dns-prefetch before the item for each cross-origin resource
            foreach ($item['preconnect_origins'] ?? [] as $origin) {
                $origin = e($origin);
                $document->{$location}[] = '<link rel="preconnect" href="'.$origin.'" crossorigin>';
                $document->{$location}[] = '<link rel="dns-prefetch" href="'.$origin.'">';
            }

            $document->{$location}[] = $item['html'];
        }
    }

    private function resolveFrontend(ServerRequestInterface $request): string
    {
        $routeName = (string) $request->getAttribute('routeName', '');

        return str_starts_with($routeName, 'admin') ? 'admin' : 'forum';
    }
}
