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

namespace IanM\HtmlHead;

use Flarum\Database\AbstractModel;

/**
 * @property int         $id
 * @property string|null $description
 * @property string|null $header       Legacy raw HTML (base64-encoded at rest); null for structured rows
 * @property bool        $active
 * @property string      $type         'meta'|'link'|'script'|'style'|'raw'
 * @property string      $location     'head'|'foot'
 * @property array       $pages        e.g. ['forum'] or ['forum','admin']
 * @property int         $sort_order
 * @property array|null  $attributes   Structured attributes keyed by type
 */
class Header extends AbstractModel
{
    /**
     * Separate cache keys per injection location.
     */
    public const CACHE_KEY_HEAD = 'active_html_headers.head';
    public const CACHE_KEY_FOOT = 'active_html_headers.foot';

    /**
     * @deprecated Use CACHE_KEY_HEAD / CACHE_KEY_FOOT. Kept for safe rollout only.
     */
    public const CACHE_KEY = 'active_html_headers';

    public const VALID_TYPES = ['meta', 'link', 'script', 'style', 'raw'];
    public const VALID_LOCATIONS = ['head', 'foot'];
    public const VALID_PAGES = ['forum', 'admin'];

    protected $table = 'html_headers';

    public $timestamps = true;

    protected $fillable = [
        'description',
        'header',
        'active',
        'type',
        'location',
        'pages',
        'sort_order',
        'attributes',
    ];

    protected $casts = [
        'active'     => 'boolean',
        'pages'      => 'array',
        'attributes' => 'array',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Whether this is a legacy row with raw HTML stored in the header column.
     */
    public function isLegacyRaw(): bool
    {
        // Use getRawOriginal to avoid the Eloquent internal $attributes property collision
        return $this->type === 'raw' && empty($this->getRawOriginal('attributes'));
    }

    /**
     * @deprecated Only used for legacy raw rows. New rows use the attributes column.
     */
    public static function encode(string $string): string
    {
        return base64_encode($string);
    }

    /**
     * @deprecated Only used for legacy raw rows. New rows use the attributes column.
     */
    public static function decode(string $string): string
    {
        return base64_decode($string);
    }
}
