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
 * @property string|null $header
 * @property bool        $active
 */
class Header extends AbstractModel
{
    public const CACHE_KEY = 'active_html_headers';

    protected $table = 'html_headers';

    public $timestamps = true;

    protected $fillable = ['description', 'header', 'active'];

    protected $casts = [
        'active'     => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function encode(string $string): string
    {
        return base64_encode($string);
    }

    public static function decode(string $string): string
    {
        return base64_decode($string);
    }
}
