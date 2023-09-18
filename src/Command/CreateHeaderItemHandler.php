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

use IanM\HtmlHead\Event\HeaderCreated;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class CreateHeaderItemHandler
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
     * @param CreateHeaderItem $command
     *
     * @throws \Flarum\User\Exception\PermissionDeniedException
     *
     * @return Header
     */
    public function handle(CreateHeaderItem $command): Header
    {
        $command->actor->assertAdmin();

        $headerAttributes = [
            'description' => Arr::get($command->data, 'attributes.description', ''),
            'header'      => Arr::get($command->data, 'attributes.header', ''),
            'active'      => Arr::get($command->data, 'attributes.enabled', false),
        ];

        $headerItem = Header::create($headerAttributes);

        $this->events->dispatch(
            new HeaderCreated($headerItem, $command->actor, $command->data)
        );

        return $headerItem;
    }
}
