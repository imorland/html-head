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
use Flarum\User\Exception\PermissionDeniedException;
use IanM\HtmlHead\Event\HeaderUpdated;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Events\Dispatcher;

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
     * @return mixed
     */
    public function handle(UpdateHeaderItem $command)
    {
        $command->actor->assertAdmin();
        $data = $command->data;

        $header = Header::findOrFail($command->headerId);

        if (isset($data['data']['attributes']['description'])) {
            $header->description = $data['data']['attributes']['description'];
        }

        if (isset($data['data']['attributes']['header'])) {
            $header->header = $data['data']['attributes']['header'];
        }

        if (isset($data['active'])) {
            $header->active = $data['active'];
        }

        $header->updated_at = Carbon::now();

        $header->save();

        $this->events->dispatch(
            new HeaderUpdated($header, $command->actor, $data)
        );

        return $header;
    }
}
