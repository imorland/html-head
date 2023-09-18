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
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Cache\Repository as Cache;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;

class AddHeaders
{
    /**
     * @var Cache
     */
    protected $cache;

    /**
     * @var LoggerInterface
     */
    protected $logger;

    public function __construct(Cache $cache, LoggerInterface $logger)
    {
        $this->cache = $cache;
        $this->logger = $logger;
    }

    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        $headers = $this->getHeaders();

        foreach ($headers as $header) {
            if ($this->isValidHeader($header)) {
                $document->head[] = $header;
            } else {
                $this->logger->error('[ianm/html-head] Invalid header: '.$header);
            }
        }
    }

    /**
     * Check if the given header content is valid.
     *
     * @param string $header
     *
     * @return bool
     */
    protected function isValidHeader(string $header): bool
    {
        return Str::startsWith(trim($header), '<') && Str::endsWith(trim($header), '>');
    }

    /**
     * Retrieve headers either from cache or database.
     *
     * @return array
     */
    protected function getHeaders(): array
    {
        $headers = $this->cache->get(Header::CACHE_KEY);

        if (!$headers) {
            $headers = Header::where('active', 1)->pluck('header')->toArray();
            $this->cache->forever(Header::CACHE_KEY, $headers);
        }

        return $headers;
    }
}
