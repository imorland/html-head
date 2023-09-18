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

class HeaderDeleted
{
    public $header;
    public $actor;

    public function __construct(Header $header, User $actor)
    {
        $this->header = $header;
        $this->actor = $actor;
    }
}
