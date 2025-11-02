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

namespace IanM\HtmlHead\Api\Resource;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use IanM\HtmlHead\Event\HeaderCreated;
use IanM\HtmlHead\Event\HeaderDeleted;
use IanM\HtmlHead\Event\HeaderUpdated;
use IanM\HtmlHead\Header;
use Illuminate\Contracts\Events\Dispatcher;
use Tobyz\JsonApiServer\Context as OriginalContext;

/**
 * @extends AbstractDatabaseResource<Header>
 */
class HeaderResource extends AbstractDatabaseResource
{
    public function __construct(
        protected Dispatcher $events
    ) {
    }

    public function type(): string
    {
        return 'html-headers';
    }

    public function model(): string
    {
        return Header::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make()
                ->authenticated()
                ->can('administrate'),
            
            Endpoint\Create::make()
                ->authenticated()
                ->can('administrate'),
            
            Endpoint\Update::make()
                ->authenticated()
                ->can('administrate'),
            
            Endpoint\Delete::make()
                ->authenticated()
                ->can('administrate'),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('description')
                ->requiredOnCreate()
                ->maxLength(200)
                ->writable(),
            
            Schema\Str::make('header')
                ->requiredOnCreate()
                ->maxLength(300)
                ->writable()
                ->get(fn (Header $header) => Header::encode($header->header))
                ->set(function (Header $header, string $value) {
                    $header->header = Header::decode($value);
                }),
            
            Schema\Boolean::make('active')
                ->writable()
                ->default(false),
            
            Schema\DateTime::make('createdAt')
                ->visible(),
            
            Schema\DateTime::make('updatedAt')
                ->visible(),
        ];
    }

    public function creating(object $model, OriginalContext $context): ?object
    {
        $this->events->dispatch(
            new HeaderCreated($model, $context->getActor(), $context->body())
        );

        return $model;
    }

    public function updating(object $model, OriginalContext $context): ?object
    {
        if ($model->isDirty()) {
            $this->events->dispatch(
                new HeaderUpdated($model, $context->getActor(), $context->body())
            );
        }

        return $model;
    }

    public function deleting(object $model, OriginalContext $context): void
    {
        $this->events->dispatch(
            new HeaderDeleted($model, $context->getActor())
        );
    }
}
