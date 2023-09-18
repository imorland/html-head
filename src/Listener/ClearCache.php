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

namespace IanM\HtmlHead\Listener;

use Flarum\Foundation\Event\ClearingCache;
use IanM\HtmlHead\Event\HeaderCreated;
use IanM\HtmlHead\Event\HeaderDeleted;
use IanM\HtmlHead\Event\HeaderUpdated;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Cache\Repository as Cache;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Log\LoggerInterface;

class ClearCache
{
    public $cache;
    public $logger;

    public function __construct(Cache $cache, LoggerInterface $logger)
    {
        $this->cache = $cache;
        $this->logger = $logger;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen([ClearingCache::class, HeaderCreated::class, HeaderUpdated::class, HeaderDeleted::class], [$this, 'clearCache']);
    }

    public function clearCache($event)
    {
        $this->cache->forget(Header::CACHE_KEY);
        $this->logger->info('[ianm/html-head] Cleared cache for '.Header::CACHE_KEY.' due to '.get_class($event).' event firing.');
    }
}
