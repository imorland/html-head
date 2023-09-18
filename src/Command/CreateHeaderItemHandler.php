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

use Carbon\Carbon;
use IanM\HtmlHead\Event\HeaderCreated;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Events\Dispatcher;

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
    public function handle(CreateHeaderItem $command)
    {
        $command->actor->assertAdmin();
        $data = $command->data;

        $headerItem = new Header();

        $headerItem->description = isset($data['attributes']['description']) ? $data['attributes']['description'] : '';
        $headerItem->header = isset($data['attributes']['header']) ? $data['attributes']['header'] : '';
        $headerItem->active = isset($data['attributes']['enabled']) ? $data['attributes']['active'] : false;
        $headerItem->created_at = Carbon::now();
        $headerItem->updated_at = Carbon::now();

        $headerItem->save();

        $this->events->dispatch(
            new HeaderCreated($headerItem, $command->actor, $data)
        );

        return $headerItem;
    }
}
