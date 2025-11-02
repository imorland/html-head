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

namespace IanM\HtmlHead\Event;

use Flarum\User\User;
use IanM\HtmlHead\Header;

class HeaderCreated
{
    public function __construct(public Header $header, public User $actor, public array $data)
    {
    }
}
