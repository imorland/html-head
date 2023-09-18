<?php

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
        // Retrieve headers either from cache or database
        $headers = $this->getHeaders();

        // Append each header to the document's head
        foreach ($headers as $header) {
            if (Str::startsWith(trim($header), '<') && Str::endsWith(trim($header), '>')) {
                $document->head[] = $header;
            } else {
                $this->logger->error('Invalid header: ' . $header);
            }
        }
    }

    protected function getHeaders(): array
    {
        return $this->cache->remember('active_html_headers', 60, function() {
            // Only fetch the 'header' column for active headers
            return Header::where('active', 1)->pluck('header')->toArray();
        });
    }
}
