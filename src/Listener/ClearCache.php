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
use IanM\HtmlHead\CacheRebuilder;
use IanM\HtmlHead\Event\HeaderCreated;
use IanM\HtmlHead\Event\HeaderDeleted;
use IanM\HtmlHead\Event\HeaderUpdated;
use Illuminate\Contracts\Events\Dispatcher;

class ClearCache
{
    public function __construct(private readonly CacheRebuilder $rebuilder)
    {
    }

    public function subscribe(Dispatcher $events): void
    {
        // After a header is saved/deleted, invalidate and immediately rebuild
        // so the next request hits a warm cache.
        $events->listen(
            [HeaderCreated::class, HeaderUpdated::class, HeaderDeleted::class],
            [$this, 'invalidateAndRebuild']
        );

        // On a full cache:clear command, only invalidate — don't rebuild.
        // The first request will trigger a cold-miss rebuild automatically.
        $events->listen(ClearingCache::class, [$this, 'invalidateOnly']);
    }

    public function invalidateAndRebuild(): void
    {
        $this->rebuilder->invalidate();
        $this->rebuilder->rebuild();
    }

    public function invalidateOnly(): void
    {
        $this->rebuilder->invalidate();
    }
}
