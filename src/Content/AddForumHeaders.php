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

namespace IanM\HtmlHead\Content;

class AddForumHeaders extends AddHeaders
{
    protected function frontend(): string
    {
        return 'forum';
    }
}
