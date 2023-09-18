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
    public $header;
    public $actor;
    public $data;

    public function __construct(Header $header, User $actor, array $data)
    {
        $this->header = $header;
        $this->actor = $actor;
        $this->data = $data;
    }
}
