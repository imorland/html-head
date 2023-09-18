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

use IanM\HtmlHead\Event\HeaderDeleted;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Events\Dispatcher;

class DeleteHeaderItemHandler
{
    /**
     * @var Dispatcher
     */
    protected $events;

    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }

    /**
     * @param DeleteHeader $command
     *
     * @return mixed
     */
    public function handle(DeleteHeaderItem $command)
    {
        $command->actor->assertAdmin();

        $header = Header::findOrFail($command->headerId);

        $header->delete();

        $this->events->dispatch(
            new HeaderDeleted($header, $command->actor)
        );

        return $header;
    }
}
