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

namespace IanM\HtmlHead\Tests\integration\frontend;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use IanM\HtmlHead\CacheRebuilder;
use PHPUnit\Framework\Attributes\Test;

class PageTargetingTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    private const FORUM_ONLY = '<meta name="html-head-test" content="forum-only">';
    private const ADMIN_ONLY = '<meta name="html-head-test" content="admin-only">';
    private const BOTH = '<meta name="html-head-test" content="both">';

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('ianm-html-head');

        $this->prepareDatabase([
            'html_headers' => [
                $this->item(1, 'forum-only', ['forum']),
                $this->item(2, 'admin-only', ['admin']),
                $this->item(3, 'both', ['forum', 'admin']),
            ],
        ]);
    }

    private function item(int $id, string $content, array $pages): array
    {
        return [
            'id'          => $id,
            'description' => $content,
            'header'      => null,
            'active'      => true,
            'type'        => 'meta',
            'location'    => 'head',
            'pages'       => json_encode($pages),
            'sort_order'  => $id,
            'attributes'  => json_encode(['name' => 'html-head-test', 'content' => $content]),
        ];
    }

    private function render(string $path): string
    {
        $this->app();
        // The rendered items are cached forever, so a cache left by an earlier test would hide these rows.
        $this->app()->getContainer()->make(CacheRebuilder::class)->rebuild();

        $response = $this->send($this->request('GET', $path, ['authenticatedAs' => 1]));

        $this->assertEquals(200, $response->getStatusCode());

        return (string) $response->getBody();
    }

    #[Test]
    public function forum_gets_only_the_items_applied_to_the_forum()
    {
        $html = $this->render('/');

        $this->assertStringContainsString(self::FORUM_ONLY, $html);
        $this->assertStringContainsString(self::BOTH, $html);
        $this->assertStringNotContainsString(self::ADMIN_ONLY, $html);
    }

    #[Test]
    public function admin_gets_only_the_items_applied_to_the_admin()
    {
        $html = $this->render('/admin');

        $this->assertStringContainsString(self::ADMIN_ONLY, $html);
        $this->assertStringContainsString(self::BOTH, $html);
        $this->assertStringNotContainsString(self::FORUM_ONLY, $html);
    }
}
