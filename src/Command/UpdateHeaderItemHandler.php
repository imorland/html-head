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

use Flarum\User\Exception\PermissionDeniedException;
use IanM\HtmlHead\Event\HeaderUpdated;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class UpdateHeaderItemHandler
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
     * @param UpdateHeaderItem $command
     *
     * @throws PermissionDeniedException
     *
     * @return Header
     */
    public function handle(UpdateHeaderItem $command): Header
    {
        $command->actor->assertAdmin();

        $header = Header::findOrFail($command->headerId);

        $header->description = Arr::get($command->data, 'data.attributes.description', $header->description);
        $header->header = Arr::get($command->data, 'data.attributes.header', $header->header);
        $header->active = Arr::get($command->data, 'active', $header->active);

        // Only save and dispatch if there are changes
        if ($header->isDirty()) {
            $header->save();

            $this->events->dispatch(
                new HeaderUpdated($header, $command->actor, $command->data)
            );
        }

        return $header;
    }
}
