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

use Flarum\Testing\integration\TestCase;
use IanM\HtmlHead\CacheRebuilder;
use PHPUnit\Framework\Attributes\Test;

class CoreMetaTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('ianm-html-head');

        $this->prepareDatabase([
            'settings' => [
                ['key' => 'forum_description', 'value' => 'Description from the basic settings'],
            ],
            'html_headers' => [
                $this->metaItem(1, 'description', 'Description from an item'),
                $this->metaItem(2, 'robots', 'noindex'),
            ],
        ]);
    }

    private function metaItem(int $id, string $name, string $content): array
    {
        return [
            'id'          => $id,
            'description' => $name,
            'header'      => null,
            'active'      => true,
            'type'        => 'meta',
            'location'    => 'head',
            'pages'       => json_encode(['forum']),
            'sort_order'  => $id,
            'attributes'  => json_encode(['name' => $name, 'content' => $content]),
        ];
    }

    private function renderForum(): string
    {
        $this->app();
        // The rendered items are cached forever, so a cache left by an earlier test would hide these rows.
        $this->app()->getContainer()->make(CacheRebuilder::class)->rebuild();

        $response = $this->send($this->request('GET', '/'));

        $this->assertEquals(200, $response->getStatusCode());

        return (string) $response->getBody();
    }

    #[Test]
    public function an_item_named_like_a_tag_flarum_outputs_replaces_it()
    {
        $html = $this->renderForum();

        $this->assertSame(1, substr_count($html, '<meta name="description"'));
        $this->assertStringContainsString('<meta name="description" content="Description from an item">', $html);
        $this->assertStringNotContainsString('Description from the basic settings', $html);
    }

    #[Test]
    public function an_item_with_any_other_name_is_added()
    {
        $html = $this->renderForum();

        $this->assertSame(1, substr_count($html, '<meta name="robots" content="noindex">'));
    }
}
