<?php

namespace IanM\HtmlHead\Listener;

use Flarum\Foundation\Event\ClearingCache;
use IanM\HtmlHead\Event\HeaderCreated;
use IanM\HtmlHead\Event\HeaderDeleted;
use IanM\HtmlHead\Event\HeaderUpdated;
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
        $this->cache->forget('active_html_headers');
        $this->logger->info('Cleared cache for active_html_headers due to ' . get_class($event) . ' event.');
    }
}
