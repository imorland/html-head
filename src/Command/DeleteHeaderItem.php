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

namespace IanM\HtmlHead\Command;

use Flarum\User\User;

class DeleteHeaderItem
{
    /**
     * DeleteHeaderItem constructor.
     *
     */
    public function __construct(public User $actor, public $headerId)
    {
    }
}
