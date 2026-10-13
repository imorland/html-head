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

namespace IanM\HtmlHead\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use IanM\HtmlHead\Header;
use PHPUnit\Framework\Attributes\Test;

class CreateHeaderTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('ianm-html-head');
    }

    #[Test]
    public function header_column_accepts_null_for_structured_items()
    {
        $this->app();

        $columns = $this->database()->getSchemaBuilder()->getColumns('html_headers');
        $header = collect($columns)->firstWhere('name', 'header');

        $this->assertTrue($header['nullable']);
    }

    #[Test]
    public function admin_can_create_a_raw_item()
    {
        $response = $this->send(
            $this->request('POST', '/api/html-headers', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'html-headers',
                        'attributes' => [
                            'description' => 'Favicon',
                            'type'        => 'raw',
                            'attributes'  => ['content' => '<link rel="icon" href="https://example.com/favicon.ico">'],
                            'active'      => true,
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode(), (string) $response->getBody());

        $item = Header::query()->where('description', 'Favicon')->firstOrFail();

        // An empty string, not null, so the insert also succeeds on a forum whose
        // header column is still NOT NULL because `php flarum migrate` wasn't run.
        $this->assertSame('', $item->header);
        $this->assertNull(json_decode((string) $response->getBody(), true)['data']['attributes']['header']);
        $this->assertEquals(['content' => '<link rel="icon" href="https://example.com/favicon.ico">'], $item->getAttribute('attributes'));
    }

    #[Test]
    public function admin_can_create_a_structured_item()
    {
        $response = $this->send(
            $this->request('POST', '/api/html-headers', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'html-headers',
                        'attributes' => [
                            'description' => 'Theme colour',
                            'type'        => 'meta',
                            'attributes'  => ['name' => 'theme-color', 'content' => '#e74c3c'],
                            'active'      => true,
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode(), (string) $response->getBody());

        $this->assertSame('', Header::query()->where('description', 'Theme colour')->firstOrFail()->header);
    }

    #[Test]
    public function saving_without_a_header_never_writes_null()
    {
        $this->app();

        $item = Header::create([
            'description' => 'No header',
            'type'        => 'meta',
            'location'    => 'head',
            'pages'       => ['forum'],
            'sort_order'  => 0,
            'attributes'  => ['name' => 'robots', 'content' => 'noindex'],
            'active'      => true,
        ]);

        $this->assertSame('', $this->database()->table('html_headers')->where('id', $item->id)->value('header'));

        $item->header = null;
        $item->save();

        $this->assertSame('', $this->database()->table('html_headers')->where('id', $item->id)->value('header'));
    }

    #[Test]
    public function admin_can_update_an_item()
    {
        $this->app();

        $item = Header::create([
            'description' => 'Editable',
            'type'        => 'raw',
            'location'    => 'head',
            'pages'       => ['forum'],
            'sort_order'  => 0,
            'attributes'  => ['content' => '<meta name="a" content="b">'],
            'active'      => true,
        ]);

        $response = $this->send(
            $this->request('PATCH', '/api/html-headers/'.$item->id, [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'html-headers',
                        'id'         => (string) $item->id,
                        'attributes' => [
                            'attributes' => ['content' => '<meta name="c" content="d">'],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame('', $item->fresh()->header);
    }
}
