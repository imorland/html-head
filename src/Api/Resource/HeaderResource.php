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
                ->can('administrate')
                ->defaultSort('sortOrder'),

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

            Schema\Str::make('type')
                ->requiredOnCreate()
                ->in(Header::VALID_TYPES)
                ->writable(),

            Schema\Str::make('location')
                ->writable()
                ->default('head')
                ->in(Header::VALID_LOCATIONS),

            Schema\Arr::make('pages')
                ->writable()
                ->default(['forum']),

            Schema\Integer::make('sortOrder')
                ->writable()
                ->default(0)
                ->property('sort_order'),

            Schema\Arr::make('attributes')
                ->writable()
                ->nullable(),

            // Legacy field — readable for raw rows that still use the header column.
            // New rows should use type + attributes instead.
            Schema\Str::make('header')
                ->nullable()
                ->visible()
                ->get(function (Header $header) {
                    // Expose for legacy raw rows: type=raw with no structured attributes
                    // Use getRawOriginal to bypass the Eloquent 'attributes' name collision
                    $hasStructuredAttrs = !empty($header->getRawOriginal('attributes'));
                    if ($header->type === 'raw' && !$hasStructuredAttrs && $header->header !== null) {
                        return Header::encode($header->header);
                    }
                    return null;
                })
                ->set(function (Header $header, ?string $value) {
                    // Only accept writes for explicit raw type with no attributes
                    if ($header->type === 'raw' && $value !== null) {
                        $header->header = Header::decode($value);
                    }
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

    public function sorts(): array
    {
        return [
            \Flarum\Api\Sort\SortColumn::make('sortOrder'),
        ];
    }

    /**
     * Override create() to dispatch event AFTER the model is persisted.
     */
    public function create(object $model, OriginalContext $context): object
    {
        parent::create($model, $context);

        $this->events->dispatch(
            new HeaderCreated($model, $context->getActor(), $context->body())
        );

        return $model;
    }

    /**
     * Override update() to dispatch event AFTER the model is persisted.
     */
    public function update(object $model, OriginalContext $context): object
    {
        parent::update($model, $context);

        if ($model->wasChanged()) {
            $this->events->dispatch(
                new HeaderUpdated($model, $context->getActor(), $context->body())
            );
        }

        return $model;
    }

    /**
     * Override delete() to dispatch event AFTER the model is deleted.
     */
    public function delete(object $model, OriginalContext $context): void
    {
        parent::delete($model, $context);

        $this->events->dispatch(
            new HeaderDeleted($model, $context->getActor())
        );
    }
}
