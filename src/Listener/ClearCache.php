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

class ClearCache
{
    public $cache;

    public function __construct(Cache $cache)
    {
        $this->cache = $cache;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen([ClearingCache::class, HeaderCreated::class, HeaderUpdated::class, HeaderDeleted::class], [$this, 'clearCache']);
    }

    public function clearCache($event)
    {
        $this->cache->forget(Header::CACHE_KEY);
    }
}
