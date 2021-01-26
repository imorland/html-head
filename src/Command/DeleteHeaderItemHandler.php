<?php

/*
 * This file is part of ianm/html-head.
 *
 * Copyright (c) 2021 IanM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace IanM\HtmlHead\Command;

use Flarum\User\AssertPermissionTrait;
use IanM\HtmlHead\Header;

class DeleteHeaderItemHandler
{
    use AssertPermissionTrait;
    
    /**
     * @param DeleteHeader $command
     *
     * @return mixed
     */
    public function handle(DeleteHeaderItem $command)
    {
        $this->assertAdmin($command->actor);

        $header = Header::findOrFail($command->headerId);

        $header->delete();

        return $header;
    }
}