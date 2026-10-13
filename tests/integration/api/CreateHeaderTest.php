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

        $this->assertNull($item->header);
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

        $this->assertNull(Header::query()->where('description', 'Theme colour')->firstOrFail()->header);
    }
}
