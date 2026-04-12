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

use Flarum\Extend;

return [

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Frontend('forum'))
        ->content(Content\AddHeaders::class),

    (new Extend\Frontend('admin'))
        ->content(Content\AddHeaders::class),

    new Extend\ApiResource(Api\Resource\HeaderResource::class),

    (new Extend\Event())
        ->subscribe(Listener\ClearCache::class),
];
