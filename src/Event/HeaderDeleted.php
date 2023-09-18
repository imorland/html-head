<?php

namespace IanM\HtmlHead\Event;

use IanM\HtmlHead\Header;
use Flarum\User\User;

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
