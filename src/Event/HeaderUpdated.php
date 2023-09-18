<?php

namespace IanM\HtmlHead\Event;

use IanM\HtmlHead\Header;
use Flarum\User\User;

class HeaderUpdated
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
